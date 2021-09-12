import { ref,  } from "vue";

export default function usePagination(dataTask?: any) {

  const dataPerPage = ref<number>(3)

  const currentDataIndex = ref<string>("")

  const pagination = (start: number, end?: number) => {
    if (typeof dataTask.sortData == "undefined") {
        dataTask.task  = dataTask.allTasks.slice(start, end)
    } else { 
        dataTask.sortData  = dataTask.allTasks.slice(start, end)
    }
  } 

  const paginateStart = ((page: any) => {
    if (currentDataIndex.value == "") {
      currentDataIndex.value = page
      switch (page) {
        case '1':
          pagination(0, dataPerPage.value)
          break;
        case '2':
          pagination(3, dataPerPage.value + 3)
          break;
        case '3':
          pagination(6, 9)
          break;
      }

    } else {
      currentDataIndex.value = page
      switch (page) {
        case '1':
          pagination(0, dataPerPage.value)
          break;
        case '2':
          pagination(3, dataPerPage.value + 3)
          break;
        case '3':
          pagination(6, 9)
          break;
      }
    }
 
  })

  
  
  return { pagination, paginateStart, dataPerPage, currentDataIndex }
    
}
