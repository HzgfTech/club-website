import { readFile, writeFile, copyFile, mkdir, stat, readdir, unlink } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const library = resolve(root, 'content')
const catalog = JSON.parse(await readFile(resolve(library, 'public-content/catalog.json'), 'utf8'))
const downloads = resolve(root, 'public/downloads')
await mkdir(downloads, { recursive: true })
await mkdir(resolve(root, 'public/data'), { recursive: true })

const filenames = new Set()
for (const resource of catalog.resources) {
  if (typeof resource.file !== 'string' || basename(resource.file) !== resource.file || /[\\/:]/.test(resource.file) || resource.file.startsWith('.')) {
    throw new Error(`公开资源文件名无效：${resource.id}`)
  }
  const source = resolve(library, 'public-files', resource.file)
  const info = await stat(source)
  if (!info.isFile()) throw new Error(`公开资源不是文件：${resource.id}`)
  await copyFile(source, resolve(downloads, resource.file))
  resource.bytes = info.size
  filenames.add(resource.file)
}
for (const filename of await readdir(downloads)) {
  if (!filenames.has(filename)) await unlink(resolve(downloads, filename))
}
await writeFile(resolve(root, 'public/data/catalog.json'), JSON.stringify(catalog, null, 2))
await copyFile(resolve(library, 'public-files/forge-mark.svg'), resolve(root, 'public/favicon.svg'))
console.log(`已同步 ${catalog.resources.length} 份公开资源。`)
