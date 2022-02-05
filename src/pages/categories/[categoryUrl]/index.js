import Loader from '../../../common/components/Loader'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Category = () => {
  const router = useRouter()
  useEffect(() => {
    if (router.query && router.query.categoryUrl) {
      router.push(`/categories/${router.query.categoryUrl}/page/1`).then()
    }
  }, [router.query])
  return <Loader />
}

export default Category
