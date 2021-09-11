//import dataModel from "@/components/task-search/tasks-data-model";



export default function useBudget() {
    const formatBudget = (value: number ,currency: string,location: string) => {
        const numberObject = new Number(value);
        const myObj = {
            style: "currency",
            currency: currency
        };
        return numberObject.toLocaleString(location, myObj);
    }


    return {formatBudget}
}


