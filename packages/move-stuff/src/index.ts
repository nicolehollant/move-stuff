#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { hideBin } from 'yargs/helpers'
import Yargs from 'yargs/yargs'
import { type ArgumentsCamelCase } from 'yargs'

const yargs = Yargs(hideBin(process.argv))
  .version('1.0.0')
  .describe('d', 'Destroy links to config files')
  .alias('l', 'location')
  .nargs('l', 1)
  .describe('l', 'Give path to location of config files')
  .usage('Usage: $0 [options]')
  .help('h')
  .alias('h', 'help')
  .command({
    command: 'create',
    aliases: 'c',
    describe: 'Creates links to config files',
    async handler(argv) {
      const configLocation = await getConfigLocation(argv)
      for await (const p of walk(path.join(process.cwd(), configLocation))) {
        await fs.promises.symlink(p, path.join(process.cwd(), p.split('/')?.at(-1) ?? ''), 'file')
      }
      console.log('move-stuff: symlinks created')
    },
  })
  .command({
    command: 'destroy',
    aliases: 'd',
    describe: 'Destroys links to config files',
    async handler(argv) {
      const configLocation = await getConfigLocation(argv)
      for await (const p of walk(path.join(process.cwd(), configLocation))) {
        await fs.promises.unlink(path.join(process.cwd(), p.split('/')?.at(-1) ?? ''))
      }
      console.log('move-stuff: symlinks destroyed')
    },
  })

async function getConfigLocation(argv: ArgumentsCamelCase<any>) {
  if (argv.l) {
    return argv.l
  }
  return (
    JSON.parse((await fs.promises.readFile(path.join(process.cwd(), 'package.json'))).toString())?.['move-stuff']
      ?.location ?? 'config-files'
  )
}

async function* walk(dir: string): AsyncGenerator<string, any, undefined> {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

yargs.parse()
