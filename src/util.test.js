// @flow
import { isPrimitive, obj2Cli } from './util'

test('return true when primitive', () => {
  expect(isPrimitive(1)).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  expect(isPrimitive(undefined)).toBe(true)
  expect(isPrimitive(null)).toBe(true)
  expect(isPrimitive('hello')).toBe(true)
  expect(isPrimitive(Symbol('hello'))).toBe(true)
})

test('return false when not primitive', () => {
  expect(isPrimitive({})).toBe(false)
  expect(isPrimitive(() => {})).toBe(false)
})

test('transform to process.argv from object', () => {
  expect(obj2Cli({ name: 'anje' })).toEqual([null, null, '--name', 'anje'])
})
