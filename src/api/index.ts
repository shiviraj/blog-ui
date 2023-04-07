import { Posts } from './modules'
import Categories from './modules/Categories'
import { BACKEND_URL } from '../config'

const API = {
  posts: new Posts(`${BACKEND_URL}/api/posts`),
  // users: users(BFF_URL),
  // pages: pages(BFF_URL),
  // posts: posts(BFF_URL),
  // oauth: oauth(BFF_URL),
  categories: new Categories(`${BACKEND_URL}/api/categories`)
  // tags: tags(BFF_URL),
  // comments: comments(BFF_URL)
}

export default API
