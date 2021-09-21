import { useRouter } from 'vue-router'
//import { onMounted } from 'vue'

export default function useHandleRoute() {
  const router = useRouter()
  const pathLocation = router.currentRoute.value.path
  const allQuery = router.currentRoute.value.query

  const existingQuery = () => {
    return new Promise((resolve) => {
      if (Object.keys(allQuery).length > 0) {
        resolve(allQuery)
      } else {
        resolve(false)
      }
    })
  }

  const queryPlatform = (platform: string) => {
    existingQuery().then((res) => {
      //  console.log(res)
      if (res !== false) {
        console.log(res)
        router.push({
          path: pathLocation,
          query: Object.assign({ platform: platform }, res),
        })
      }
    })
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
