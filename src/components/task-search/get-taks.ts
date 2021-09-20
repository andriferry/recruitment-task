import api from '@/services/api'
import { ParamsData } from '@/models/search-tasks.model'

export default function fetch() {
  const getTasks = (paramsData: ParamsData) => api.get('tasks', { params: paramsData })
  return { getTasks }
}
