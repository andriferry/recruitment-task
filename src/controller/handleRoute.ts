import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default function useHandleRoute() {
  const router: any = useRouter()

  const queryRouter = computed(() => router.currentRoute.value.query)

  const checkAllQuery = () => {
    if (Object.keys(queryRouter.value).length > 1) {
      console.log(queryRouter.value)
    } else {
      console.log(queryRouter.value)
    }
  }

  return { checkAllQuery }
}
