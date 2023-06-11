import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthorType } from '../api/dto'
import api from '../api'
import { useRouter } from 'next/router'

const defaultAuthor: AuthorType = { authorId: '', bio: '', displayName: '', name: '', profile: '', username: '' }
export const AuthorContext = createContext<AuthorType>(defaultAuthor)

const AuthorProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [author, setAuthor] = useState<AuthorType>(defaultAuthor)
  const router = useRouter()
  useEffect(() => {
    if (router.pathname.startsWith('/author')) {
      api.authors
        .validate()
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
