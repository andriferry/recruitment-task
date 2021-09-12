export default function usePagination(dataTask: any) {



  const nextPage = ((page: string) => {

  })


  const previousPage = ((page: string) => {

  })



  const toPagination = () => {
    
  }


  const pagination = (start: number, end?: number) => {
      if (typeof dataTask.sortData == "undefined") {
        dataTask.task  = dataTask.allTasks.slice(start, end)
      } else { 
        dataTask.sortData  = dataTask.allTasks.slice(start, end)
      }
  }
    
  
  
  return { pagination }
    
}
