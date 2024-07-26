import { benchmarkSuite } from 'jest-bench'

import { createTailwindMerge, createTailwindMerge2, getDefaultConfig } from '../src'
import { createTailwindMergeOriginal } from '../src/lib/create-tailwind-merge'

const tailwindMerge = createTailwindMerge(() => getDefaultConfig())
const tailwindMerge2 = createTailwindMerge2(() => getDefaultConfig())
const tailwindMergeOriginal = createTailwindMergeOriginal(() => getDefaultConfig())

benchmarkSuite('createTailwindMerge', {
    setup() {},
    setupSuite() {
        // warmup
        for (let i = 0; i < 100; ++i) {
            tailwindMerge2(
                'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px]'.slice(
                    0,
                    i,
                ),
            )
            tailwindMerge(
                'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px] bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 bg-red-300 hover:bg-red-50 active:px-4 active:px-2'.slice(
                    0,
                    i,
                ),
            )

            tailwindMergeOriginal(
                'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px] bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 bg-red-300 hover:bg-red-50 active:px-4 active:px-2'.slice(
                    0,
                    i,
                ),
            )
        }
    },

    original: () => {
        tailwindMergeOriginal(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px]',
        )
        tailwindMergeOriginal(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px] bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 bg-red-300 hover:bg-red-50 active:px-4 active:px-2',
        )
    },
    rortan134: () => {
        tailwindMerge2(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col  transform-y-5 px-4 z-10 !z-10 p-[10px]',
        )

        tailwindMerge2(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px] bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 bg-red-300 hover:bg-red-50 active:px-4 active:px-2',
        )
    },
    xantre: () => {
        tailwindMerge(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px]',
        )
        tailwindMerge(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px] bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 bg-red-300 hover:bg-red-50 active:px-4 active:px-2',
        )
    },
})
