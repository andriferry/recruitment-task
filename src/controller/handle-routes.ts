import { useRouter } from 'vue-router'

export default function useHandleRoute() {
  const router = useRouter()

  const queryPlatform = (platform: string) => {
    router.push({ path: '/tasks-search', query: { platform } })
  }

  const queryKeyword = (keyword: string) => {
    console.log(keyword)
  }

  return { queryPlatform }
}
