import api from '@/services/api'

export default function fetch() {
  const getTasks = (paramsData: undefined) =>
    api.get('tasks', { params: paramsData })
  return { getTasks }
}
