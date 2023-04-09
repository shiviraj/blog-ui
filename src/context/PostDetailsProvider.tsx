import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { PostDetailsType } from '../api/dto'
import type { SideBarLinksWithTitle } from './PostsSummaryProvider'

type PostDetailsProviderPropsType = {
  post: PostDetailsType
  sideBarLinks: SideBarLinksWithTitle[]
}

export type PostDetailsContextType = {
  updatePost: <K extends keyof PostDetailsType>(key: K, value: PostDetailsType[K]) => void
} & PostDetailsProviderPropsType
export const PostDetailsContext = createContext<PostDetailsContextType | null>(null)

const PostDetailsProvider = (props: PropsWithChildren<PostDetailsProviderPropsType>): JSX.Element => {
  const { children, sideBarLinks, post } = props
  const [postDetails, setPostDetails] = useState({ ...post })

  const updatePost = <K extends keyof PostDetailsType>(key: K, value: PostDetailsType[K]) => {
    setPostDetails(prevPostDetails => ({ ...prevPostDetails, [key]: value }))
  }

  return (
    <PostDetailsContext.Provider value={{ sideBarLinks, post: postDetails, updatePost }}>
      {children}
    </PostDetailsContext.Provider>
  )
}

export const usePostDetails = (): PostDetailsContextType => {
  const result = useContext(PostDetailsContext)
  if (result !== null) {
    return result
  }
  return {} as PostDetailsContextType
}
export default PostDetailsProvider
