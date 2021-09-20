import { reactive, onMounted, ref } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'
import fetch from '@/components/task-search/get-taks'
import usePlatform from '@/controller/platforms'

export default function useTask() {
  const { getTasks } = fetch()
  const platform = usePlatform()
  const params = reactive<ParamsData>({
    limit: 6,
  })
  const allTasks = ref()
  const tasks = ref()
  const allPlatforms = ref(['OTHER'])

  onMounted(() => {
    getTasks(params).then((res) => {
      allTasks.value = res.data.tasks
      tasks.value = res.data.tasks.slice(0, 3)
      platform.getPlatform(allPlatforms.value, allTasks)
      console.log(allPlatforms.value)
    })
  })

  return { params, tasks, allPlatforms }
}
