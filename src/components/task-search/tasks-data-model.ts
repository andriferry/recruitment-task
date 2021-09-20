import { reactive, onMounted, ref } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'
import fetch from '@/components/task-search/get-taks'

export default function useTask() {
  const { getTasks } = fetch()
  const params = reactive<ParamsData>({
    limit: 100,
  })
  const allTasks = ref()
  const tasks = ref()
  const allPlatforms = ref(['OTHER'])

  const removeDuplicatePlatform = () => {
    const platforms = allTasks.value
      .map((element: any) => element.platforms)
      .flat()
    
  }

  onMounted(() => {
    getTasks(params).then((res) => {
      allTasks.value = res.data.tasks
      tasks.value = res.data.tasks.slice(0, 3)
      //removeDuplicatePlatform(res.data.tasks)
      removeDuplicatePlatform()
    })
  })

  return { params, tasks }
}
