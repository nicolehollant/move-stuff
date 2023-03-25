import fs from 'fs'
import path from 'path'
import { exit } from 'process'

async function* walk(dir: string): AsyncGenerator<string, any, undefined> {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

async function walkCb(cb: (p: string) => Promise<void> | void) {
  for await (const p of walk(path.join(__dirname, 'config-files'))) {
    await cb(p)
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log('please provide more args lol')
    exit(0)
  }
  if (process.argv[2] === 'create') {
    await walkCb((p) => {
      fs.promises.symlink(p, path.join(__dirname, p.split('/')?.at(-1) ?? ''), 'file')
    })
  }
  if (process.argv[2] === 'destroy') {
    await walkCb((p) => {
      fs.promises.unlink(path.join(__dirname, p.split('/')?.at(-1) ?? ''))
    })
  }
}

main()
