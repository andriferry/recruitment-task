import { params, allDataComponent } from '@/models/search-tasks.model'
import api from "@/services/api";
import { reactive, ref , onMounted , computed } from 'vue'
import usePlatform from '@/controller/platform';
import usePagination from '@/controller/pagination';
import { useRouter } from "vue-router";



export default function dataModel() {

    const parameter = reactive<params>({ limit: 100 });
    
    const router = useRouter();

    const queryRouter = router.currentRoute.value.query;


    const componentTask = reactive<allDataComponent>({
        task: undefined,
        allPlatform: ["ALL"],
        sortData: undefined, 
        allTasks: undefined,
        singleData: undefined
    })

    const { getPlatform , sortPlatform , mountPlatform } = usePlatform(componentTask)
    
    const {pagination } = usePagination(componentTask)

    const selectedPlatform = ref<string|any>("all")

    const selectedBudget = ref<string|any>("selected")

    const keyword = ref<string>("")


    const dataTask = computed(() => {
        return  typeof componentTask.sortData == "undefined" ? componentTask.task : componentTask.sortData
    })


    const getTasks = () => api.get("tasks", { params: parameter })


    onMounted(() => {
        getTasks().then(res => {
            componentTask.allTasks = res.data.tasks
            pagination(0, 6)
            
            if (Object.keys(queryRouter).length > 0) {
               
                if (typeof queryRouter.platform !== "undefined") {
                    if (queryRouter.platform !== "") {
                        mountPlatform().then(res => {
                            if (res == true) selectedPlatform.value = queryRouter.platform
                        })
                    }
                } else if (typeof queryRouter.budget !== "undefined") {
                    if (queryRouter.budget !== "") {
                        if (queryRouter.budget == "selected") {
                            // pagination(0, 6)
                            getPlatform()
                        } else {
                            // pagination(0, 6)
                            getPlatform()
                            selectedBudget.value = queryRouter.budget
                            sortPlatform(queryRouter.budget)
                        }
                    }         
                } else {
                    // pagination(0, 6)
                    getPlatform()
                }
                
            } else {
                // if (typeof queryRouter.platform !== "undefined") {
                //     if (queryRouter.platform !== "") {
                //         if (queryRouter.platform == "all") {
                //             pagination(0, 6)
                //             getPlatform()
                //         } else {
                //             pagination(0, 6) // First slice to show 6 data
                //             getPlatform()
                //             selectedPlatform.value = queryRouter.platform
                //             sortPlatform(queryRouter.platform)
                //         }
                //     }
                // } else if (typeof queryRouter.budget !== "undefined") {
                //     if (queryRouter.budget !== "") {
                //         if (queryRouter.budget == "selected") {
                //             pagination(0, 6)
                //             getPlatform()
                //         } else {
                //             pagination(0, 6)
                //             getPlatform()
                //             selectedBudget.value = queryRouter.budget
                //             sortPlatform(queryRouter.budget)
                //         }
                //     }         
                // } else {
                //     pagination(0, 6)
                //     getPlatform()
                // }

                console.log('else')
                getPlatform()
                
                
                
                
                
            }

            
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
