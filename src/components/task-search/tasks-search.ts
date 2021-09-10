import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {  params } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {

  const router = useRouter()

  const allTasks = ref()

  const tasks = ref()
  
  const allPlatform = ref()

  const parameter = reactive<params>({
    limit: 10
  });
  
  const removeDuplicatePlatform = (platform: [string]) => {
    allPlatform.value = ['All',...new Set(platform)]
  }
  
  
  const getPlatform = () => {
    const getDataPlatform = tasks.value.map((element: any) => element.platforms.flat())
    removeDuplicatePlatform(getDataPlatform.flat())

  }

  const pagination = (start: number ,end: number) => {
    tasks.value = allTasks.value.slice(start,end)
  } 
  
  
    
  const getTasks = () => {
    api.get("tasks", {params: parameter}).then(res => {
      allTasks.value = res.data.tasks
      pagination(0,6) // First slice to show 6 data 
      getPlatform()
    })
    }
  
    const formatBudget = (value: number ,currency: string,location: string) => {
      const numberObject = new Number(value);
      const myObj = {
        style: "currency",
        currency: currency
      };
      return numberObject.toLocaleString(location, myObj);
    }
    
 
  return {
    getTasks,
    tasks,
    formatBudget,
    router,
    allTasks,
    pagination,
    allPlatform
  }
}
