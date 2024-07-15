import { benchmarkSuite } from 'jest-bench'

import { createTailwindMerge, createTailwindMerge2 } from '../src'

const tailwindMerge = createTailwindMerge(() => ({
    cacheSize: 20,
    separator: ':',
    theme: {},
    classGroups: {
        fooKey: [{ fooKey: ['bar', 'baz'] }],
        fooKey2: [{ fooKey: ['qux', 'quux'] }, 'other-2'],
        otherKey: ['nother', 'group'],
    },
    conflictingClassGroups: {
        fooKey: ['otherKey'],
        otherKey: ['fooKey', 'fooKey2'],
    },
    conflictingClassGroupModifiers: {},
}))
const tailwindMerge2 = createTailwindMerge2(() => ({
    cacheSize: 20,
    separator: ':',
    theme: {},
    classGroups: {
        fooKey: [{ fooKey: ['bar', 'baz'] }],
        fooKey2: [{ fooKey: ['qux', 'quux'] }, 'other-2'],
        otherKey: ['nother', 'group'],
    },
    conflictingClassGroups: {
        fooKey: ['otherKey'],
        otherKey: ['fooKey', 'fooKey2'],
    },
    conflictingClassGroupModifiers: {},
}))

benchmarkSuite('createTailwindMerge', {
    setup() {},
    'v1': () => {
        tailwindMerge('my-modifier:fooKey-bar my-modifier:fooKey-baz')
    },
    'v2': () => {
        tailwindMerge2('my-modifier:fooKey-bar my-modifier:fooKey-baz')
    },
})
