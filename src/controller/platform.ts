export default function usePlatform(dataTask?: any) {
    const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();

    const removeDuplicatePlatform = (platform: [string]) => {
        dataTask.allPlatform.push(...new Set(platform))
    }


    const sortPlatform = (platform: string) => {
        const array: string[] = []
    
        dataTask.task.forEach((element: any, index: number) => {
            const matchPlatform = element.platforms.filter((data: string) => data.toLowerCase() == platform)
            if (matchPlatform.length > 0) array.push(dataTask.task[index])
        

        })
        

        dataTask.sortData = array
    }


    const getPlatform = () => {
        const getDataPlatform = dataTask.task.map((element: any) => element.platforms.flat())
        removeDuplicatePlatform(getDataPlatform.flat())
    }


    return {createdPlatformValue , getPlatform , sortPlatform}
}