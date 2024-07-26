import { Bench } from 'tinybench'

import { getDefaultConfig } from '../src'
import { createTailwindMergeBench } from '../src/lib/create-tailwind-merge'
import { mergeClassList, mergeClassList2, mergeClassListOriginal } from '../src/lib/merge-classlist'

const bench = new Bench({
    time: 1000,
})
for (const [name, it] of [
    ['original', mergeClassListOriginal],
    ['rortan134', mergeClassList2],
    ['xantre', mergeClassList],
] as const) {
    const merge = createTailwindMergeBench(it, () => getDefaultConfig())
    bench.add(name, () => {
        merge(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px]',
        )
        merge(
            'transform-y-4 my-modifier:fooKey-bar my-modifier:fooKey-baz px-2 py-4 p-4 ml-1 mr-2 my-2 mb-3 grid flex flex-col transform-y-5 px-4 z-10 !z-10 p-[10px] bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 bg-red-300 hover:bg-red-50 active:px-4 active:px-2',
        )
    })
}

;(async () => {
    await bench.warmup()
    await bench.run()

    console.table(bench.table())
})()
