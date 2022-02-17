import Loader from '../../../common/components/Loader'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Category = () => {
  const router = useRouter()
  useEffect(() => {
    if (router.query.categoryUrl) {
      router.push(`/categories/${router.query.categoryUrl}/page/1`).then()
    }
  }, [router.query.categoryUrl])
  return <Loader />
}

export default Category
