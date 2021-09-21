import { useRouter } from 'vue-router'

export default function useHandleRoute() {
  const router = useRouter()
  const pathLocation = router.currentRoute.value.path

  const queryPlatform = (platform: string) => {
    router.push({ path: pathLocation, query: { platform } })
  }

  const queryGreaterBudget = (greaterBudget: number) => {
    router.push({ path: pathLocation, query: { greaterBudget } })
  }

  const queryLowerBudget = (lowerBudget: number) => {
    router.push({ path: pathLocation, query: { lowerBudget } })
  }

  const queryKeyword = (keyword: string) => {
    router.push({ path: pathLocation, query: { keyword } })
  }

  return { queryPlatform, queryKeyword, queryGreaterBudget, queryLowerBudget }
}
