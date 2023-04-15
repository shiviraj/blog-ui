import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthorPostType } from '../api/dto'
import api from '../api'
import { Loader, useToast } from '../common/components'

type AuthorPostContextType = {
  post: AuthorPostType
  loader: boolean
  updatePost: <K extends keyof AuthorPostType>(keyName: K, value: AuthorPostType[K]) => void
}
export const AuthorPostContext = createContext<AuthorPostContextType | null>(null)

const AuthorPostProvider = ({ children, postId }: PropsWithChildren<{ postId: string }>): JSX.Element => {
  const toast = useToast()
  const [post, setPost] = useState<AuthorPostType | null>(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (postId) {
      api.posts
        .getPostByPostId(postId)
        .then(authorPost => {
          setPost(authorPost)
        })
        .catch(() => {
          toast.error('Failed to find post')
        })
        .finally(() => {
          setLoader(false)
        })
    }
  }, [postId])

  useEffect(() => {
    if (post !== null) {
      setLoader(true)
      api.posts
        .updatePost(post)
        .catch()
        .finally(() => {
          setLoader(false)
        })
    }
  }, [post])

  const updatePost = <K extends keyof AuthorPostType>(keyName: K, value: AuthorPostType[K]): void => {
    setPost(prevPost => {
      if (prevPost !== null) {
        return { ...prevPost, [keyName]: value }
      }
      return prevPost
    })
  }

  if (post === null) {
    return <Loader />
  }

  return <AuthorPostContext.Provider value={{ loader, post, updatePost }}>{children}</AuthorPostContext.Provider>
}

export const useAuthorPost = (): AuthorPostContextType => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useContext(AuthorPostContext)!
}
export default AuthorPostProvider
