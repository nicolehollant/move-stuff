![patrick star meme, top text: tailwind.config.ts .prettierrc commitlint.config.cjs ..., bottom text: /config](https://object.nyc3.cdn.digitaloceanspaces.com/imaj/63d3d0c100ffe47ab756bfe8/oss/TtuRckqOYhNlF10IG8Jdf-patrick.jpeg)

# move-stuff

> We should take ur config files and _push them somewhere else_

You might be annoyed with the [amount of config files in your project root](https://www.youtube.com/watch?v=14WanxTD2O4). Individual packages can build support for their config files to live in a separate directory (or pull config from your `package.json`), but that puts the onus on the module authors. `move-stuff` gives a quick and simple way to stop the sprawl of config files so you can reclaim your project root.

We create and destroy symlinks for everything found in `config` (or a directory that you specify in `package.json['move-stuff']['location']`).

## Usage

```sh
# Example usage with npx
npx move-stuff create
npx move-stuff destroy

# Full usage:
Usage: move-stuff [options]

Commands:
  move-stuff create   Creates links to config files                 [aliases: c]
  move-stuff destroy  Destroys links to config files                [aliases: d]

Options:
      --version   Show version number                                  [boolean]
  -d              Destroy links to config files
  -l, --location  Give path to location of config files
  -h, --help      Show help                                            [boolean]
```

We recommend wrapping your scripts like so:

before:

```json
// package.json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt postinstall"
  },
}
```

after:

```json
// package.json
{
  "scripts": {
    "build": "move-stuff create && nuxt build && move-stuff destroy",
    "dev": "move-stuff create && nuxt dev && move-stuff destroy",
    "movestuff:create": "move-stuff create",
    "movestuff:destroy": "move-stuff destroy",
    "generate": "move-stuff create && nuxt generate && move-stuff destroy",
    "preview": "move-stuff create && nuxt preview && move-stuff destroy",
    "postinstall": "move-stuff create && nuxt postinstall && move-stuff destroy"
  },
}
```

## Using a different directory

By default, we search for config files in the `config` directory, but you can specify something else in your `package.json` by adding a `move-stuff` key like so:

```json
// package.json
{
  "move-stuff": {
    "location": "my-config-files"
  }
}
```