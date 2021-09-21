import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default function useHandleRoute() {
  const router = useRouter()
  const pathLocation = router.currentRoute.value.path

  const allQuery = computed(() => router.currentRoute.value.query)

  // const existingQuery = () => {
  //   return new Promise<any>((resolve) => {
  //     if (Object.keys(allQuery.value).length > 0) {
  //       resolve(allQuery.value)
  //     } else {
  //       resolve(false)
  //     }
  //   })
  // }

  const queryPlatform = (platform: string) => {
    if (Object.keys(allQuery.value).length > 1) {
      console.log(allQuery.value)
    } else {
      router.push({ path: pathLocation, query: { platform } })
    }
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
