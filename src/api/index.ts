import { Authors, Categories, Posts } from './modules'
import { BACKEND_URL } from '../config'

const API = {
  authors: new Authors(`${BACKEND_URL}/api/authors`),
  categories: new Categories(`${BACKEND_URL}/api/categories`),
  posts: new Posts(`${BACKEND_URL}/api/posts`)
  // pages: pages(BFF_URL),
  // posts: posts(BFF_URL),
  // oauth: oauth(BFF_URL),
  // tags: tags(BFF_URL),
  // comments: comments(BFF_URL)
}

export default API
