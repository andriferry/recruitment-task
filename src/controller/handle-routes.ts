import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default function useHandleRoute() {
  const router = useRouter()
  const pathLocation = router.currentRoute.value.path

  const existingQuery = () => {
    console.log('Jell')
  }

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

  onMounted(() => {
    console.log(router.currentRoute.value.query)

    const get = router.currentRoute.value.query

    for (const key in get) {
      if (Object.prototype.hasOwnProperty.call(get, key)) {
        const element = get[key]
        console.log(element)
      }
    }
  })

  return { queryPlatform, queryKeyword, queryGreaterBudget, queryLowerBudget }
}
