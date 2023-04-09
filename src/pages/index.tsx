import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Loader } from '../common/components'

const HomePage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/posts')
  }, [])

  return <Loader />
}

export default HomePage
