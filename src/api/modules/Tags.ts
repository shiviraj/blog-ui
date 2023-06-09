import fetch from '../adapter'
import type { PostSummaryType, TagType } from '../dto'
import { METHODS } from './constants'
import type { PostCount } from '../dto'

class Tags {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  getAllTags(): Promise<TagType[]> {
    return fetch<TagType[]>(this.url)
  }

  addNewTag(name: string): Promise<TagType> {
    return fetch<TagType>(this.url, { name }, { method: METHODS.POST })
  }

  getPosts(tagUrl: string, page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/${tagUrl}/page/${page}`)
  }

  getPostsCount(tagUrl: string): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/${tagUrl}/count`)
  }

  getTag(tagUrl: string): Promise<TagType> {
    return fetch<TagType>(`${this.url}/${tagUrl}`)
  }
}

export default Tags
