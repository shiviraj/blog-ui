import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { PostDetailsType } from '../api/dto'
import type { SideBarLinksWithTitle } from './PostsSummaryProvider'

export type PostDetailsContextType = { post: PostDetailsType; sideBarLinks: SideBarLinksWithTitle[] }
export const PostDetailsContext = createContext<PostDetailsContextType | null>(null)

const PostDetailsProvider = (props: PropsWithChildren<PostDetailsContextType>): JSX.Element => {
  const { children, sideBarLinks, post } = props
  return <PostDetailsContext.Provider value={{ sideBarLinks, post }}>{children}</PostDetailsContext.Provider>
}

export const usePostDetails = (): PostDetailsContextType => {
  const result = useContext(PostDetailsContext)
  if (result !== null) {
    return result
  }
  return {} as PostDetailsContextType
}
export default PostDetailsProvider
