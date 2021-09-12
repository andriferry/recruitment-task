import { useRouter } from 'vue-router'
import usePagination from './pagination';
import { computed } from 'vue';

export default function usePlatform(dataTask?: any) {
    const router: any = useRouter()

    const queryRouter = computed(() => router.currentRoute.value.query)


    const {checkQueryPage} = usePagination()

    const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();

    const removeDuplicatePlatform = (platform: [string]) => {
        dataTask.allPlatform.push(...new Set(platform))
    }

    const routePush = ((platform: string, budget: string, page?: number) => {
        router.push({
            path: router.currentRoute.value.path,
            query: {
                platform,
                budget,
                page
            }
        })
    }) 


    const queryPlatform = (platform: any, budget: string) => {
        checkQueryPage().then(respond => {
            respond == true  ? routePush(platform,budget, queryRouter.value.page) : routePush(platform, budget)
        })
    }

    const sortPlatform = (platform: any, budget?: any) => {
        const array: string[] = []
        queryPlatform(platform, budget)
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

    const mountPlatform = () => {
        return new Promise<boolean>((resolve) => {
            if (queryRouter.value.platform !== "") {
                if (queryRouter.value.platform !== "all") {
                    getPlatform()
                    sortPlatform(queryRouter.value.platform,)
                    resolve(true)
                } else {
                    getPlatform()
                }
            }
            
        })
    }

    return {createdPlatformValue, mountPlatform,   getPlatform , sortPlatform}
}