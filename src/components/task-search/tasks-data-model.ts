import { reactive, onMounted, ref } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'
import fetch from '@/components/task-search/get-taks'

export default function useTask() {
  const { getTasks } = fetch()
  const params = reactive<ParamsData>({
    limit: 6,
  })

  const allTasks = ref()

  const tasks = ref()

  onMounted(() => {
    getTasks(params).then((res) => {
      allTasks.value = res.data.tasks
      tasks.value = res.data.tasks.slice(0, 3)
    })

    console.log('log')
  })

  return { params, tasks }
}
