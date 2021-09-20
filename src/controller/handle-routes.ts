import { useRouter } from 'vue-router'

export default function useHandleRoute() {
  const router = useRouter()
  const pathLocation = router.currentRoute.value.path

  const queryPlatform = (platform: string) => {
    router.push({ path: pathLocation, query: { platform } })
  }

  const queryKeyword = (keyword: string) => {
    router.push({ path: pathLocation, query: { keyword } })
  }

  return { queryPlatform, queryKeyword }
}
