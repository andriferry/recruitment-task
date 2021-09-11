//import dataModel from "../components/task-search/tasks-data-model";


export default function useBudget(componentTask: any) {
   

    const formatBudget = (value: number ,currency: string,location: string) => {
        const numberObject = new Number(value);
        const myObj = {
            style: "currency",
            currency: currency
        };
        return numberObject.toLocaleString(location, myObj);
    }

    const sortMaxBudget = () => {
        if (typeof componentTask.sortData == "undefined") {
            componentTask.task.sort((a: any,b: any) => (a.budget.value < b.budget.value) ? 1 : ((b.budget.value < a.budget.value) ? -1 : 0))   
        } else {
            componentTask.sortData.sort((a: any,b: any) => (a.budget.value < b.budget.value) ? 1 : ((b.budget.value < a.budget.value) ? -1 : 0))
        }
    }


    const sortMinBudget = () => {
        if (typeof componentTask.sortData == "undefined") {
            componentTask.task.sort((a: any,b: any) => (a.budget.value > b.budget.value) ? 1 : ((b.budget.value > a.budget.value) ? -1 : 0))
        } else {
            componentTask.sortData.sort((a: any,b: any) => (a.budget.value > b.budget.value) ? 1 : ((b.budget.value > a.budget.value) ? -1 : 0))
        }
    }


    const sortBudget = (budget: string) => {
        console.log(componentTask)
        if (budget == "max") {
            sortMaxBudget()
        } else {
            sortMinBudget()
        }
    }


    return {formatBudget, sortBudget , componentTask}
}


