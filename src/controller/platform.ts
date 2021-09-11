export default function usePlatform(dataTask?: any) {
    const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();

    const removeDuplicatePlatform = (platform: [string]) => {
        dataTask.allPlatform.push(...new Set(platform))
    }


    const getPlatform = () => {
        const getDataPlatform = dataTask.task.map((element: any) => element.platforms.flat())
        removeDuplicatePlatform(getDataPlatform.flat())
    }


    return {createdPlatformValue , getPlatform}
}