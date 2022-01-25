import Loader from '../../common/components/Loader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import API from '../../API'
import { useToast } from '../../common/components/ToastWrapper'
import { handleLogin } from '../../utils/auth'
import PageError from '../../common/components/PageError'
import { setUser } from '../../modules/user/action'
import { useDispatch } from 'react-redux'
import Login from '../../modules/login'

const OAuth = () => {
  const [error, setError] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (router.query && router.query.code) {
      API.oauth.signIn(router.query.code)
        .then((data) => {
          dispatch(setUser(data.user))
          handleLogin(router, data)
        })
        .catch((err) => {
          setError(true)
          toast.error(err)
        })
    }
  }, [router.query])
  
  if (error) {
    return <PageError message={'Something went wrong, Please try again!!'}>
      <Login />
    </PageError>
  }
  
  return <Loader />
}

export default OAuth
