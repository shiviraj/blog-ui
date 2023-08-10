import { config } from '../config'
import type { PostCount, PostSummaryType, TagType } from './dto'
import WebClient from './webClient'

const tagConfig = config.tag
const TagGateway = {
  getAllTags(): Promise<TagType[]> {
    return WebClient.get<TagType[]>({ baseUrl: tagConfig.baseUrl, path: '' })
  },

  addNewTag(name: string): Promise<TagType> {
    return WebClient.post<TagType>({ baseUrl: tagConfig.baseUrl, path: '', body: { name } })
  },

  getPosts(tagUrl: string, page: number): Promise<PostSummaryType[]> {
    return WebClient.get<PostSummaryType[]>({
      baseUrl: tagConfig.baseUrl,
      path: tagConfig.getPostsPath,
      uriVariables: { tagUrl, page }
    })
  },

  getPostsCount(tagUrl: string): Promise<PostCount> {
    return WebClient.get<PostCount>({
      baseUrl: tagConfig.baseUrl,
      path: tagConfig.getPostsCountPath,
      uriVariables: { tagUrl }
    })
  },

  getTag(tagUrl: string): Promise<TagType> {
    return WebClient.get<TagType>({ baseUrl: tagConfig.baseUrl, path: tagConfig.getTagPath, uriVariables: { tagUrl } })
  }
}

export default TagGateway
