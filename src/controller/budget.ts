import { useRouter } from 'vue-router'

export default function useBudget(dataTask: any, platform?: string) {
    
    const router: any = useRouter()
    
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

    const queryBudget = ((budget: string) => {
        router.push({
            path: router.currentRoute.value.fullPath,
            query: {
                platform,
                budget
            }
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


    return {formatBudget, sortBudget }
}


