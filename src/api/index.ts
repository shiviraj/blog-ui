import { Comments, Posts, Site, Tags } from './modules'
import { BACKEND_URL } from '../config'

const API = {
  comments: new Comments(`${BACKEND_URL}/comments`),
  posts: new Posts(`${BACKEND_URL}/posts`),
  // pages: pages(BFF_URL),
  site: new Site(`${BACKEND_URL}/site`),
  tags: new Tags(`${BACKEND_URL}/tags`)
}

export default API

export { default as AuthorGateway } from './authorGateway'
export * from './authorGateway'

export { default as CategoryGateway } from './categoryGateway'
export * from './categoryGateway'
