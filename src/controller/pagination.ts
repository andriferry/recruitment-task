import dataModel from "@/components/task-search/tasks-data-model";

export default function usePagination() {
    const {componentTask} = dataModel()


    const pagination = (start: number, end?: number) => {

    if (typeof componentTask.sortData == "undefined") {
      componentTask.task  = componentTask.allTasks.slice(start, end)
    } else { 
      componentTask.sortData  = componentTask.allTasks.slice(start, end)
    }

    
  }
    
    return {pagination}
    
}
