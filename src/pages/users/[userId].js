import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import API from '../../API'
import Loader from '../../common/components/Loader'
import Users from '../../modules/user/User'

const User = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  // const [posts, setPosts] = useState([])
  
  useEffect(() => {
    if (router.query.userId) {
      API.users.getAuthor(router.query.userId).then(setUser)
      // API.posts.getPostsByAuthor(router.query.userId).then(setPosts)
    }
  }, [router.query.userId])
  
  if (!user) {
    return <Loader />
  }
  
  return <div>
    <Users user={user} />
  </div>
}

export default User
