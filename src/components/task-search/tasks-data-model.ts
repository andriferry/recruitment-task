import { reactive, onMounted, ref, watch } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'
import fetch from '@/components/task-search/get-taks'
import usePlatform from '@/controller/platforms'

export default function useTask() {
  const { getTasks } = fetch()
  const { getPlatform, sortingByPlatform } = usePlatform()
  const params = reactive<ParamsData>({
    limit: 6,
  })
  const allTasks = ref()
  const tasks = ref()
  const allPlatforms = ref(['OTHER'])
  const selectedPlatform = ref('other')

  const slicingData = (dataTask: [string]) => {
    tasks.value = dataTask.slice(0, 3)
  }

  watch(selectedPlatform, (value: string) => {
    if (value == 'other') {
      slicingData(allTasks.value)
    } else {
      sortingByPlatform(params.limit, value.toUpperCase()).then((res) => {
        slicingData(res.data.tasks)
      })
    }
  })

  onMounted(() => {
    getTasks(params).then((res) => {
      allTasks.value = res.data.tasks

      slicingData(res.data.tasks)
      getPlatform(allPlatforms.value, allTasks)
    })
  })

  return { params, tasks, allPlatforms, selectedPlatform }
}
