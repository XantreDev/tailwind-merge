import { Bench } from 'tinybench'

import { ClassNameValue, getDefaultConfig, twJoin } from '../src'
import { mergeClassList, mergeClassList2, mergeClassListOriginal } from '../src/lib/merge-classlist'
import { createConfigUtils } from '../src/lib/config-utils'
import { GenericConfig } from '../src/lib/types'

type CreateConfigFirst = () => GenericConfig
type CreateConfigSubsequent = (config: GenericConfig) => GenericConfig
type TailwindMerge = (...classLists: ClassNameValue[]) => string
type ConfigUtils = ReturnType<typeof createConfigUtils>

export function createTailwindMergeBench(
    mergeClassList: (value: string, configUtils: ConfigUtils) => string,
    createConfigFirst: CreateConfigFirst,
    ...createConfigRest: CreateConfigSubsequent[]
): TailwindMerge {
    let configUtils: ConfigUtils
    let functionToCall = initTailwindMerge

    function initTailwindMerge(classList: string) {
        const config = createConfigRest.reduce(
            (previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig),
            createConfigFirst() as GenericConfig,
        )

        configUtils = createConfigUtils(config)
        functionToCall = tailwindMerge

        return tailwindMerge(classList)
    }

    function tailwindMerge(classList: string) {
        return mergeClassList(classList, configUtils)
    }

    return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments as any))
    }
}

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
