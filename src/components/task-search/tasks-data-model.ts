import { AllDataComponent } from '@/models/search-tasks.model'
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import usePlatform from '@/controller/platform'
import usePagination from '@/controller/pagination'
import useBudget from '@/controller/budget'

export default function dataModel() {
  const router = useRouter()
  const queryRouter = router.currentRoute.value.query

  const parameter = reactive({ limit: 100 })

  const componentTask = reactive<AllDataComponent>({
    task: undefined,
    allPlatform: ['ALL'],
    sortData: undefined,
    allTasks: undefined,
    singleData: undefined,
  })

  const { getPlatform, mountPlatform } = usePlatform(componentTask)

  const { mountBudget } = useBudget(componentTask)

  const { pagination } = usePagination(componentTask)

  const selectedPlatform: string | any = ref('all')

  const selectedBudget: string | any = ref('selected')

  const dataTask = computed(() => {
    return typeof componentTask.sortData == 'undefined'
      ? componentTask.task
      : componentTask.sortData
  })

  const getTasks = () => api.get('tasks', { params: parameter })

  onMounted(() => {
    getTasks().then((res) => {
      componentTask.allTasks = res.data.tasks
      pagination(0, 6)

      if (Object.keys(queryRouter).length > 0) {
        if (typeof queryRouter.platform !== 'undefined') {
          mountPlatform().then((respond) => {
            if (respond == true) selectedPlatform.value = queryRouter.platform
          })
        } else if (typeof queryRouter.budget !== 'undefined') {
          mountBudget().then((respond) => {
            if (respond == true) {
              getPlatform()

              selectedBudget.value = queryRouter.budget
            } else {
              getPlatform()
            }
          })
        } else {
          getPlatform()
        }
      } else {
        getPlatform()
      }
    })
  })

  return { selectedBudget, selectedPlatform, componentTask, dataTask }
}
