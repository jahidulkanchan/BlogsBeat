import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_api_url,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { signOutUser } = useAuth()
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        console.log(
          'error caught from our very own axios interceptor-->',
          error.response
        )
        if (error.response.status === 401 || error.response.status === 403) {
          signOutUser()
          .then(()=>{
            window.scrollTo(0,0)
            navigate('/login')
          })
        }
      }
    )
  }, [signOutUser, navigate])
  return axiosSecure
}

export default useAxiosSecure