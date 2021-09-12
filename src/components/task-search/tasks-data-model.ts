import { params, allDataComponent } from '@/models/search-tasks.model'
import api from "@/services/api";
import { reactive, ref , onMounted , computed } from 'vue'
import usePlatform from '@/controller/platform';
import usePagination from '@/controller/pagination';



export default function dataModel() {

    const parameter = reactive<params>({limit: 100});

    const componentTask = reactive<allDataComponent>({
        task: undefined,
        allPlatform: ["ALL"],
        sortData: undefined, 
        allTasks: undefined,
        singleData: undefined
    })

    const { getPlatform } = usePlatform(componentTask)
    
    const {pagination} = usePagination(componentTask)

    const selectedPlatform = ref<string|any>("all")

    const selectedBudget = ref<string>("selected")

    const keyword = ref<string>("")


    const dataTask = computed(() => {
        return  typeof componentTask.sortData == "undefined" ? componentTask.task : componentTask.sortData
    })


    const getTasks = () => api.get("tasks", { params: parameter })


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
