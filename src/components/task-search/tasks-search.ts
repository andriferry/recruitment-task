import { reactive, computed, watch, ref , onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {  params , allDataComponent } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {

  const router: any = useRouter()

  const queryRouter = router.currentRoute.value.query


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

  const parameter = reactive<params>({limit: 10});

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

  const pagination = (start: number, end?: number) => {

    if (typeof componentTask.sortData == "undefined") {
      componentTask.task  = componentTask.allTasks.slice(start, end)
    } else { 
      componentTask.sortData  = componentTask.allTasks.slice(start, end)
    }

    
  }
  const selectBudget = () => {
        router.push({
          path: router.currentRoute.value.fullPath,
          query: {
            budget: selectedBudget.value,
            platform: selectedPlatform.value,
          },
        });
  };

  const selectPlatforms = () => {
        router.push({
          path: router.currentRoute.value.fullPath,
          query: {
            platform: selectedPlatform.value,
            budget: selectedBudget.value,
          },
        });
  };

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
    
  const getTasks =  () => api.get("tasks", {params: parameter})
  


  const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();
    
  
  onMounted(() => {
    getTasks().then(res => {
      componentTask.allTasks = res.data.tasks
      if (Object.keys(queryRouter).length == 0) {
          pagination(0, 6) // First slice to show 6 data
          getPlatform()
      } else {
        if (queryRouter.platform !== "undefined") {
          if (queryRouter.platform !== "") {
            if (queryRouter.platform == "all") {
              pagination(0, 6) // First slice to show 6 data
              getPlatform()
            } else {
              pagination(0, 6) // First slice to show 6 data
              getPlatform()
              selectedPlatform.value = queryRouter.platform
              sortPlatform(queryRouter.platform)
            }            
          } else {
            console.log('Your URL not found')
          }
        }
        
        if (queryRouter.budget !== "undefined") {
          if (queryRouter.budget !== "") {
            if (queryRouter.budget == "selected") {
              pagination(0, 6) // First slice to show 6 data
              getPlatform()
            } else {
              pagination(0, 6) // First slice to show 6 data
              getPlatform()
              selectedBudget.value = queryRouter.budget
              sortPlatform(queryRouter.budget)
            }            
          } else {
            console.log('Your URL not found')
          }
        }
      } 
    })
  })
  
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
    keyword,
    dataTask,
    selectedBudget,
    router,
    pagination,
    selectPlatforms,
    selectBudget,
    sortBudget,
    getTasks,
    createdPlatformValue,
    formatBudget,
  }

}
