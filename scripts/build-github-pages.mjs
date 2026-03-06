import fs from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const sourcePath = path.join(projectRoot, 'src', 'index.tsx')
const outputDir = path.join(projectRoot, 'docs')
const outputPath = path.join(outputDir, 'index.html')
const noJekyllPath = path.join(outputDir, '.nojekyll')

const source = await fs.readFile(sourcePath, 'utf8')
const marker = 'return `'
const start = source.indexOf(marker)

if (start === -1) {
  throw new Error('Could not find LP HTML template in src/index.tsx')
}

let i = start + marker.length
let html = ''
let foundEnd = false

for (; i < source.length; i += 1) {
  const char = source[i]
  const prev = source[i - 1]

  if (char === '`' && prev !== '\\') {
    foundEnd = true
    break
  }

  html += char
}

if (!foundEnd) {
  throw new Error('Could not find end of LP HTML template in src/index.tsx')
}

await fs.mkdir(outputDir, { recursive: true })
await fs.writeFile(outputPath, html, 'utf8')
await fs.writeFile(noJekyllPath, '', 'utf8')

console.log(`Generated ${path.relative(projectRoot, outputPath)}`)
