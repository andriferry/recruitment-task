import { reactive, onMounted } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'

export default function useTask() {
  const params = reactive<ParamsData>({
    limit: 6,
    platforms: '',
    keywords: '',
    budgetGreaterEqual: undefined,
    budgetLowerEqual: undefined,
    olderThanId: '',
    newerThanId: '',
    skip: undefined,
  })

  onMounted(() => {
    console.log(params)
  })

  return { params }
}
