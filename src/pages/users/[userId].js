import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import API from '../../API'
import Loader from '../../common/components/Loader'
import AboutAuthor from '../../modules/post/components/AboutAuthor'

const User = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    if (router.query.userId) {
      API.users.getAuthor(router.query.userId).then(setUser)
    }
  }, [router.query.userId])
  
  if (!user) {
    return <Loader />
  }
  
  return <div><AboutAuthor author={user} /></div>
}

export default User
