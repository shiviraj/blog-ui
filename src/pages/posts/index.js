import Loader from '../../common/components/Loader'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Posts = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/posts/page/1').then()
  }, [])
  return <Loader />
}

export default Posts
