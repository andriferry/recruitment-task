import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {  params } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {

    const router = useRouter()

    const tasks = ref()

    const parameter = reactive<params>({
      limit: 6,
      platforms: "INSTAGRAM"
    })
  
  const data = computed(() => {
       return tasks.value
    
  })
    
    const getTasks = () => {
      api.get("tasks", {params: parameter}).then(res => {
      tasks.value = res.data.tasks
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
    data
  }
}
