import Loader from '../../common/components/Loader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import API from '../../API'
import { useToast } from '../../common/components/ToastWrapper'
import { handleLogin } from '../../utils/auth'
import PageError from '../../common/components/PageError'

const OAuth = () => {
  const [error, setError] = useState(false)
  const router = useRouter()
  const toast = useToast()
  
  useEffect(() => {
    if (router.query && router.query.code) {
      API.oauth.signIn(router.query.code)
        .then((data) => handleLogin(data))
        .catch((error) => {
          setError(true)
          toast.error(error)
        })
    }
  }, [router.query])
  
  if (error) {
    return <PageError message={'Something went wrong, Please try again!!'} />
  }
  
  return <Loader />
}

export default OAuth
