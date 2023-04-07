import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { PostSummaryType } from '../api/dto'

export type SideBarLink = { name: string; url: string }
export type SideBarLinksWithTitle = { links: SideBarLink[]; title: string }

export type PostsSummaryContextType = {
  posts: PostSummaryType[]
  page: number
  totalPage: number
  sideBarLinks: SideBarLinksWithTitle[]
  title?: string
}
export const PostsSummaryContext = createContext<PostsSummaryContextType>({
  page: 1,
  posts: [],
  sideBarLinks: [],
  totalPage: 0
})

const PostsSummaryProvider = (props: PropsWithChildren<PostsSummaryContextType>): JSX.Element => {
  const { children, sideBarLinks, posts, page, totalPage, title } = props
  return (
    <PostsSummaryContext.Provider value={{ sideBarLinks, posts, page, totalPage, title }}>
      {children}
    </PostsSummaryContext.Provider>
  )
}

export const usePostsSummary = (): PostsSummaryContextType => useContext(PostsSummaryContext)
export default PostsSummaryProvider
