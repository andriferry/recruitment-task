import useTaskSearch from "@/components/task-search/tasks-search";
import { onMounted } from 'vue'



export default function useSort() {
    const { pagination, getPlatform , componentTask } = useTaskSearch()

    const sortMaxBudget = () => {
    if (typeof componentTask.sortData == "undefined") {
       componentTask.task.sort((a: any,b: any) => (a.budget.value < b.budget.value) ? 1 : ((b.budget.value < a.budget.value) ? -1 : 0))
    } else {
       componentTask.sortData.sort((a: any,b: any) => (a.budget.value < b.budget.value) ? 1 : ((b.budget.value < a.budget.value) ? -1 : 0))
    }
    }
  
    const sortMinBudget = () => {
        if (typeof componentTask.sortData == "undefined") {
            componentTask.task.sort((a: any, b: any) => (a.budget.value > b.budget.value) ? 1 : ((b.budget.value > a.budget.value) ? -1 : 0))
        } else {
            componentTask.sortData.sort((a: any, b: any) => (a.budget.value > b.budget.value) ? 1 : ((b.budget.value > a.budget.value) ? -1 : 0))
        }
    }
    const sortBudget = (budget: string) => {
        if (budget == "max") {
            sortMaxBudget()
        } else {
            sortMinBudget()
        }
    }



        // const validPlatform = () => {

        // }


        // const validBudget = () => {

        // }
  
    return {
        sortBudget
    }
  
  
    
}
