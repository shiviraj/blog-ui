import fetch from '../adapter'
import type { TagType } from '../dto'
import { METHODS } from './constants'

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
}

export default Tags
