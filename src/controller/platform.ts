import { useRouter } from 'vue-router'

export default function usePlatform(dataTask?: any , budget?: string) {
    const router: any = useRouter()

    const queryRouter = router.currentRoute.value.query;

    
    const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();

    const removeDuplicatePlatform = (platform: [string]) => {
        dataTask.allPlatform.push(...new Set(platform))
    }


    const queryPlatform = (platform: any) => {
        router.push({
            path: router.currentRoute.value.fullPath,
            query: {
                platform,
                budget
            }
        })
    }


    const sortPlatform = (platform: any) => {
        const array: string[] = []
        queryPlatform(platform)
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

    return {createdPlatformValue,   getPlatform , sortPlatform}
}