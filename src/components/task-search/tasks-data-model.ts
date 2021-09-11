import {  params , allDataComponent } from '@/models/search-tasks.model'
import api from "@/services/api";
import { reactive, ref , onMounted , computed } from 'vue'


export default function dataModel() {

    const parameter = reactive<params>({limit: 10});

    const componentTask = reactive<allDataComponent>({
        task: undefined,
        allPlatform: ["ALL"],
        sortData: undefined, 
        allTasks: undefined,
        singleData: undefined
    })

    const selectedPlatform = ref<string|any>("all")

    const selectedBudget = ref<string>("selected")

    const keyword = ref<string>("")


    const dataTask = computed(() => {
        return  typeof componentTask.sortData == "undefined" ? componentTask.task : componentTask.sortData
    })

    const removeDuplicatePlatform = (platform: [string]) => {
        componentTask.allPlatform.push(...new Set(platform))
    }

    const pagination = (start: number, end?: number) => {
        if (typeof componentTask.sortData == "undefined") {
            componentTask.task  = componentTask.allTasks.slice(start, end)
        }   else { 
            componentTask.sortData  = componentTask.allTasks.slice(start, end)
        }
    }

    const getPlatform = () => {
        const getDataPlatform = componentTask.task.map((element: any) => element.platforms.flat())
    
        removeDuplicatePlatform(getDataPlatform.flat())
    }


    const getTasks =  () => api.get("tasks", {params: parameter})


    onMounted(() => {
        getTasks().then(res => {
            componentTask.allTasks = res.data.tasks
            pagination(0, 6)
            getPlatform()
        })

    })

    return {
        selectedBudget,
        selectedPlatform,
        componentTask,
        keyword,
        dataTask
    }
  
  
    
}
