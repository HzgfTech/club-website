import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parseCatalog, publicUrl, fileSize } from '../src/lib/catalog.ts'

const actual = JSON.parse(readFileSync(new URL('../public/data/catalog.json', import.meta.url), 'utf8'))
test('实际公开资料可加载，资源大小来自文件', () => {
  const data = parseCatalog(actual)
  assert.equal(data.club.email, 'hzgftech@protonmail.com')
  assert.equal(data.resources.length, actual.resources.length)
  assert.equal(data.works.length, actual.works.length)
  assert.equal(data.members.length, actual.members.length)
  assert.ok(data.resources.every(resource => resource.bytes > 0))
})
test('拒绝资源路径穿越与重复编号', () => {
  const traversal = structuredClone(actual)
  traversal.resources[0].file = '../账号/社团邮箱.md'
  assert.throws(() => parseCatalog(traversal), /路径/)
  const duplicate = structuredClone(actual)
  duplicate.resources.push(duplicate.resources[0])
  assert.throws(() => parseCatalog(duplicate), /重复/)
})
test('拒绝脚本链接、缺失列表和无效资源大小', () => {
  assert.throws(() => publicUrl('javascript:alert(1)'))
  assert.throws(() => publicUrl('https://user:password@example.com'))
  assert.throws(() => parseCatalog({ ...actual, members: undefined }), /列表/)
  const invalid = structuredClone(actual)
  invalid.resources[0].bytes = -1
  assert.throws(() => parseCatalog(invalid), /大小/)
})
test('真实社员与作品字段支持详情展示', () => {
  const sample = structuredClone(actual)
  sample.members = [{ id: 'test-member', name: '测试资料', role: '测试', bio: '仅在测试中使用。', specialties: ['测试'], url: 'https://example.com' }]
  sample.works = [{ id: 'test-work', title: '测试作品', summary: '仅在测试中使用。', category: '测试', author: '测试', url: 'https://example.com' }]
  assert.equal(parseCatalog(sample).members[0].name, '测试资料')
  assert.equal(parseCatalog(sample).works[0].id, 'test-work')
})
test('文件大小按实际字节展示', () => {
  assert.equal(fileSize(128), '128 B')
  assert.equal(fileSize(1536), '1.5 KB')
})
