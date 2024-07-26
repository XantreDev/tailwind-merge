import { createConfigUtils } from './config-utils'
import { mergeClassList, mergeClassList2, mergeClassListOriginal } from './merge-classlist'
import { ClassNameValue, twJoin } from './tw-join'
import { GenericConfig } from './types'

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

export function createTailwindMerge(
    createConfigFirst: CreateConfigFirst,
    ...createConfigRest: CreateConfigSubsequent[]
): TailwindMerge {
    let configUtils: ConfigUtils
    // let cacheGet: ConfigUtils['cache']['get']
    let cacheSet: ConfigUtils['cache']['set']
    let functionToCall = initTailwindMerge

    function initTailwindMerge(classList: string) {
        const config = createConfigRest.reduce(
            (previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig),
            createConfigFirst() as GenericConfig,
        )

        configUtils = createConfigUtils(config)
        // cacheGet = configUtils.cache.get
        // cacheSet = configUtils.cache.set
        functionToCall = tailwindMerge

        return tailwindMerge(classList)
    }

    function tailwindMerge(classList: string) {
        // const cachedResult = cacheGet(classList)

        // if (cachedResult) {
        //     return cachedResult
        // }

        const result = mergeClassList(classList, configUtils)
        // cacheSet(classList, result)

        return result
    }

    return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments as any))
    }
}

export function createTailwindMerge2(
    createConfigFirst: CreateConfigFirst,
    ...createConfigRest: CreateConfigSubsequent[]
): TailwindMerge {
    let configUtils: ConfigUtils
    // let cacheGet: ConfigUtils['cache']['get']
    let cacheSet: ConfigUtils['cache']['set']
    let functionToCall = initTailwindMerge

    function initTailwindMerge(classList: string) {
        const config = createConfigRest.reduce(
            (previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig),
            createConfigFirst() as GenericConfig,
        )

        configUtils = createConfigUtils(config)
        // cacheGet = configUtils.cache.get
        // cacheSet = configUtils.cache.set
        functionToCall = tailwindMerge

        return tailwindMerge(classList)
    }

    function tailwindMerge(classList: string) {
        // const cachedResult = cacheGet(classList)

        // if (cachedResult) {
        //     return cachedResult
        // }

        const result = mergeClassList2(classList, configUtils)
        // cacheSet(classList, result)

        return result
    }

    return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments as any))
    }
}

export function createTailwindMergeOriginal(
    createConfigFirst: CreateConfigFirst,
    ...createConfigRest: CreateConfigSubsequent[]
): TailwindMerge {
    let configUtils: ConfigUtils
    // let cacheGet: ConfigUtils['cache']['get']
    let cacheSet: ConfigUtils['cache']['set']
    let functionToCall = initTailwindMerge

    function initTailwindMerge(classList: string) {
        const config = createConfigRest.reduce(
            (previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig),
            createConfigFirst() as GenericConfig,
        )

        configUtils = createConfigUtils(config)
        // cacheGet = configUtils.cache.get
        // cacheSet = configUtils.cache.set
        functionToCall = tailwindMerge

        return tailwindMerge(classList)
    }

    function tailwindMerge(classList: string) {
        // const cachedResult = cacheGet(classList)

        // if (cachedResult) {
        //     return cachedResult
        // }

        const result = mergeClassListOriginal(classList, configUtils)
        // cacheSet(classList, result)

        return result
    }

    return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments as any))
    }
}
