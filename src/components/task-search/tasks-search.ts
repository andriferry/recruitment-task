import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {  params } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {

    const router = useRouter()

    const allTasks = ref()

    const tasks = ref()

    const parameter = reactive<params>({
      limit: 10,
      platforms: "INSTAGRAM"
    })
  
  
    const pagination = (paginate: number) => {
      tasks.value = allTasks.value.slice(0,paginate)
    } 
  
  
    
    const getTasks = () => {
      api.get("tasks", {params: parameter}).then(res => {
        allTasks.value = res.data.tasks
        pagination(6)
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
    allTasks
  }
}
