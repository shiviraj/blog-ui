import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import SideMenubar from '../../common/components/SideMenubar'
import { isSuperUserPath } from '../../config/roles'
import { ROUTES } from '../../config/routes'
import TitleBar from './posts/components/TitleBar'
import { Stack } from '@mui/material'


const Role = ({ component: Component, title, ...rest }) => {
  const router = useRouter()
  
  useEffect(() => {
    if (router.query.role && !isSuperUserPath(router.query.role)) {
      router.push(ROUTES.HOME.USER).then()
    }
  }, [router.query.role])
  
  return <Stack>
    <SideMenubar />
    <Stack mt={3} ml={23}>
      <TitleBar title={title} />
      <Component {...rest} />
    </Stack>
  </Stack>
}

export default Role

