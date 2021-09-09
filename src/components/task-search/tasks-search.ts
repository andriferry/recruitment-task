import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useLoginValidation from '../login/login-validation'
import useUserAuthentificationController from '@/middleware/controllers/useUserAuthentificationController'
import { dataTask , params } from '@/models/search-tasks.model'
import api from "@/services/api";



export default function useTaskSearch() {
    const validation = useLoginValidation()
    const auth = useUserAuthentificationController()
    const router = useRouter() //Using router

    // const user = reactive<UserToLogin>({
    //     email: '',
    //     password: '',
    //     rememberMe: false
    // })
  
    const tasks = ref()
  
    const parameter = reactive<params>({
      limit: 6,
      platforms: "INSTAGRAM"
    })
    
    const getTasks = () => {
      api.get("tasks", {
        params: {
          limit: parameter.limit,
          platforms: parameter.platforms
        },
      }).then(res => {
      tasks.value = res.data.tasks
    })
    }
  
  const toUsd = (value :number) => {
      let numberObject = new Number(value);
      let myObj = {
        style: "currency",
        currency: "USD"
      };

      return numberObject.toLocaleString("en-US", myObj);
    }
    
  
 
  return {
    getTasks,
    tasks,
    toUsd
  }
}
