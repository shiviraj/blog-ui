import { config } from '../config'
import type { AuthorType, PostCount, PostSummaryType } from './dto'
import WebClient from './webClient'

const authorConfig = config.author
const AuthorGateway = {
  getAuthor(username: string): Promise<AuthorType> {
    return WebClient.get<AuthorType>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.getAuthorPath,
      uriVariables: { username }
    })
  },

  getPostsCount(username: string): Promise<PostCount> {
    return WebClient.get<PostCount>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.getPostsCountPath,
      uriVariables: { username }
    })
  },

  getPosts(username: string, page: number): Promise<PostSummaryType[]> {
    return WebClient.get<PostSummaryType[]>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.getPostsPath,
      uriVariables: { username, page }
    })
  },

  getAllAuthors(): Promise<AuthorType[]> {
    return WebClient.get<AuthorType[]>({
      baseUrl: authorConfig.baseUrl,
      path: ''
    })
  },

  getVisitorId(): Promise<{ visitorId: string }> {
    return WebClient.get<{ visitorId: string }>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.getVisitorIdPath
    })
  },

  login(values: { password: string; email: string }): Promise<{ token: string }> {
    return WebClient.post<{ token: string }>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.loginPath,
      body: values
    })
  },

  logout(): Promise<{ status: boolean }> {
    return WebClient.get<{ status: boolean }>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.logoutPath
    })
  },

  validate(): Promise<AuthorType> {
    return WebClient.get<AuthorType>({
      baseUrl: authorConfig.baseUrl,
      path: authorConfig.validatePath
    })
  }
}

export default AuthorGateway
