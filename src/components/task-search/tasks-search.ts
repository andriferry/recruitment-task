import { reactive, computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import {  params , allDataComponent } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {

  const router = useRouter()


  const componentTask = reactive<allDataComponent>({
    task: undefined,
    allPlatform: ["ALL"],
    sortData: undefined, // Onedata instead
    allTasks: undefined
  })

  const selected = ref<string>("all")

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
    const array: any[] = []
    componentTask.task.forEach((element: any, index: number) => {
      const matchPlatform = element.platforms.filter((data: any) => data.toLowerCase() == platform)
   
      if (matchPlatform.length > 0) array.push(componentTask.task[index])
    })

    componentTask.sortData = array

    
  }

   watch(selected, (platform: string) => {
    if (platform !== "all") {
      sortPlatform(platform)
    } else {
      componentTask.sortData = undefined
    }
  })

  const getPlatform = () => {
    const getDataPlatform = componentTask.task.map((element: any) => element.platforms.flat())
    
    removeDuplicatePlatform(getDataPlatform.flat())

  }

  const pagination = (start: number ,end?: number) => {
    componentTask.task  = componentTask.allTasks.slice(start, end)
  }
  
  
    
  const getTasks = () => {
    api.get("tasks", {params: parameter}).then(res => {
      componentTask.allTasks = res.data.tasks
      pagination(0, 6) // First slice to show 6 data
      getPlatform()
    })
  }


   const createdPlatformValue = (platformValue: string) =>
        platformValue.toLowerCase();
  
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
    selected,
    getTasks,
    dataTask,
    createdPlatformValue,
    formatBudget,
    router,
    pagination,
   
  }
}
