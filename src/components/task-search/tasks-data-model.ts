import { reactive } from 'vue'
import { ParamsData } from '@/models/search-tasks.model'

export default function useTask() {
  const params = reactive<ParamsData>({
    limit: 6,
  })

  return { params }
}
