import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthorType } from '../api/dto'
import { useRouter } from 'next/router'
import { AuthorGateway } from '../api'

export const defaultAuthor: AuthorType = {
  authorId: '',
  bio: '',
  displayName: '',
  name: '',
  profile: '',
  username: '',
  registeredAt: ''
}
export const AuthorContext = createContext<AuthorType>(defaultAuthor)

const AuthorProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [author, setAuthor] = useState<AuthorType>(defaultAuthor)
  const router = useRouter()
  useEffect(() => {
    if (router.pathname.startsWith('/author')) {
      AuthorGateway.validate()
        .then((author: AuthorType) => {
          setAuthor(author)
        })
        .catch(() => {
          return router.push('/')
        })
    }
  }, [router.pathname])

  return <AuthorContext.Provider value={author}>{children}</AuthorContext.Provider>
}

export const useAuthor = (): AuthorType => {
  return useContext(AuthorContext)
}
export default AuthorProvider
