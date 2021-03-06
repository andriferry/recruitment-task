import { reactive, onMounted, ref } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'
import fetch from '@/components/task-search/get-taks'
import usePlatform from '@/controller/platforms'

export default function useTask() {
  const { getTasks } = fetch()
  const { getPlatform } = usePlatform()
  const params = reactive<ParamsData>({ limit: 6 })
  const allTasks = ref()
  const tasks = ref()
  const allPlatforms = ref(['OTHER'])
  const selectedPlatform = ref('other')

  const slicingData = (dataTask: [string]) => {
    tasks.value = dataTask.slice(0, 3)
  }

  const dateFormat = (value: number) => {
    const dataDate = new Date(value)
    const currentDate = new Date()

    const getDate = currentDate.getDate() - dataDate.getDate()

    return `${getDate} days ago`
  }

  onMounted(() => {
    getTasks(params).then((res) => {
      allTasks.value = res.data.tasks

      slicingData(res.data.tasks)
      getPlatform(allPlatforms.value, allTasks)
    })
  })

  return {
    params,
    tasks,
    allTasks,
    allPlatforms,
    selectedPlatform,
    slicingData,
    dateFormat,
  }
}
