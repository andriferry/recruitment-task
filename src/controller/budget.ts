import { useRouter } from 'vue-router'
import usePagination from './pagination';
import { computed } from "vue";

export default function useBudget(dataTask: any, platform?: string) {
    
    const router: any = useRouter()

    const queryRouter = computed(() => router.currentRoute.value.query)

    const {checkQueryPage} = usePagination()
    //Move to interface
    const formatBudget = (value: number ,currency: string,location: string) => {
        const numberObject = new Number(value);
        const myObj = {
            style: "currency",
            currency: currency
        };
        return numberObject.toLocaleString(location, myObj);
    }

    const sortMaxBudget = () => {
        if (typeof dataTask.sortData == "undefined") {
            dataTask.task.sort((a: any,b: any) => (a.budget.value < b.budget.value) ? 1 : ((b.budget.value < a.budget.value) ? -1 : 0))   
        } else {
            dataTask.sortData.sort((a: any,b: any) => (a.budget.value < b.budget.value) ? 1 : ((b.budget.value < a.budget.value) ? -1 : 0))
        }
    }


    const sortMinBudget = () => {
        if (typeof dataTask.sortData == "undefined") {
            dataTask.task.sort((a: any,b: any) => (a.budget.value > b.budget.value) ? 1 : ((b.budget.value > a.budget.value) ? -1 : 0))
        } else {
            dataTask.sortData.sort((a: any,b: any) => (a.budget.value > b.budget.value) ? 1 : ((b.budget.value > a.budget.value) ? -1 : 0))
        }
    }

    //move to interface
    const routePush = ((budget: string, page?: number) => {
        router.push({
            path: router.currentRoute.value.fullPath,
            query: {
                platform,
                budget,
                page
            }
        })
    })

    
    const queryBudget = ((budget: string) => {
        checkQueryPage().then(respond => {
            respond == true ? routePush(budget, queryRouter.value.page) : routePush(budget)
        })
    })


    const sortBudget = (budget: string) => {
        if (budget == "max") {
            sortMaxBudget()
            queryBudget(budget)
        } else {
            sortMinBudget()
            queryBudget(budget)
        }
    }


    const mountBudget = () => {
        return new Promise<boolean>((resolve) => {
            if (queryRouter.value.budget !== "selected") {
                sortBudget(queryRouter.value.budget)
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }


    return {formatBudget, sortBudget , mountBudget }
}


