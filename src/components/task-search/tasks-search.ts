import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLoginValidation from '../login/login-validation'
import useUserAuthentificationController from '@/middleware/controllers/useUserAuthentificationController'
import { UserToLogin } from '@/models/user.model'
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
    
    const getTasks = () => 
         api.get("tasks", {
          params: {
            limit: 6,
            platforms: "INSTAGRAM",
          },
        });
    
  
 
  return {
    getTasks,

  }
}
