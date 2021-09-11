import { reactive, computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import {  params , allDataComponent } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {

  const router = useRouter()


  const componentTask = reactive<allDataComponent>({
    task: undefined,
    allPlatform: ["ALL"],
    sortData: undefined, 
    allTasks: undefined,
    singleData: undefined
  })

  const selectedPlatform = ref<string>("all")

  const selectedBudget = ref<string>("selected")

  const keyword = ref<string>("")

  const parameter = reactive<params>({
    limit: 10
  });

  const dataTask = computed(() => {
 
   return  typeof componentTask.sortData == "undefined" ? componentTask.task : componentTask.sortData
  })
  
  const removeDuplicatePlatform = (platform: [string]) => {
    componentTask.allPlatform.push(...new Set(platform))
  }
  
  const sortPlatform = (platform: string) => {
    const array: string[] = []
    componentTask.task.forEach((element: any, index: number) => {
      
      const matchPlatform = element.platforms.filter((data: string) => data.toLowerCase() == platform)
   
      if (matchPlatform.length > 0) array.push(componentTask.task[index])
    })

    componentTask.sortData = array
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
    if (budget == "max") {
      sortMaxBudget()
    } else {
      sortMinBudget()
    }  
  }

  const pagination = (start: number ,end?: number) => {

    if (typeof componentTask.sortData == "undefined") {
      componentTask.task  = componentTask.allTasks.slice(start, end)
    } else { 
      componentTask.sortData  = componentTask.allTasks.slice(start, end)
    }

    
  }
  
  watch(selectedPlatform, (platform: string) => {
    if (platform !== "all") {
      sortPlatform(platform)
    } else {
      componentTask.sortData = undefined
    }
  })

  watch(selectedBudget, (budget: string) => {
    if (budget !== "selected")  sortBudget(budget)
  })

  const getPlatform = () => {
    const getDataPlatform = componentTask.task.map((element: any) => element.platforms.flat())
    
    removeDuplicatePlatform(getDataPlatform.flat())

  }

  
  
    
  const getTasks = () => {
    api.get("tasks", {params: parameter}).then(res => {
      componentTask.allTasks = res.data.tasks
      pagination(0, 6) // First slice to show 6 data
      getPlatform()
    })
  }


   const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();
       
  
    const formatBudget = (value: number ,currency: string,location: string) => {
      const numberObject = new Number(value);
      const myObj = {
        style: "currency",
        currency: currency
      };
      return numberObject.toLocaleString(location, myObj);
    }
    
 
  return {
    componentTask,
    selectedPlatform,

    getTasks,
    keyword,
    dataTask,
    createdPlatformValue,
    formatBudget,
    router,
    pagination,
   selectedBudget
  }
}
