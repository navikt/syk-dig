import { test, expect } from 'vitest'

import { hprCorrectLength, hprOnlyNumbers } from './behandler-utils'

test.each([
    ['001234567', true],
    ['01234567', true],
    ['1234567', true],
    ['123456', false],
    ['1234567', true],
    ['12345678', true],
    ['123456789', true],
    ['', false],
    ['000000000', false],
    ['000123456', false],
])('hprCorrectLength: HPR %s should be %s', (hpr, expected) => {
    expect(hprCorrectLength(hpr)).toBe(expected)
})

test.each([
    ['001234567', true],
    ['1234567', true],
    ['123456', true],
    ['1234567', true],
    ['12345678', true],
    ['123456789', true],
    ['', false],
    ['000000000', false],
    ['123456a', false],
    ['123456b', false],
    ['aaaaaaaa', false],
])('hprOnlyNumbers: HPR %s should be %s', (hpr, expected) => {
    expect(hprOnlyNumbers(hpr)).toBe(expected)
})

test.each([
    ['001234567', true],
    ['1234567', true],
    ['123456', false],
    ['1234567', true],
    ['12345678', true],
    ['123456789', true],
    ['', false],
    ['000000000', false],
    ['123456a', false],
    ['123456b', false],
    ['aaaaaaaa', false],
    ['OO1234567', false],
    ['0O123456', false],
])('both: HPR %s should be %s', (hpr, expected) => {
    expect(hprOnlyNumbers(hpr) && hprCorrectLength(hpr)).toBe(expected)
})
