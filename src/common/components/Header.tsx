import React, {useState} from 'react'
import Appbar from './Header/Appbar'

const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  // if (isSuperUserPath(router.query.role)) {
  //   return (
  //     <Container>
  //       <Item>
  //         <Link component={Typography} href={`/${user.role && user.role.toLowerCase()}`}>
  //           Dashboard
  //         </Link>
  //         <Link component={Typography} href={'/'}>
  //           Visit Site
  //         </Link>
  //       </Item>
  //       <Item>
  //         {user.name} ({user.role})
  //       </Item>
  //     </Container>
  //   )
  // }

  return (
    <Appbar
      setOpen={() => {
        setOpen(!open)
      }}
    />
  )
}

export default Header
