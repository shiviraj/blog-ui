import { Authors, Categories, Comments, Posts, Site, Tags } from './modules'
import { BACKEND_URL } from '../config'

const API = {
  authors: new Authors(`${BACKEND_URL}/api/authors`),
  categories: new Categories(`${BACKEND_URL}/api/categories`),
  comments: new Comments(`${BACKEND_URL}/api/comments`),
  posts: new Posts(`${BACKEND_URL}/api/posts`),
  // pages: pages(BFF_URL),
  site: new Site(`${BACKEND_URL}/api/site`),
  tags: new Tags(`${BACKEND_URL}/api/tags`)
}

export default API
