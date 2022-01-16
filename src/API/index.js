import { BFF_URL } from '../config/config'
import users from './modules/user'
import pages from './modules/pages'
import oauth from './modules/oauth'
import media from './modules/media'
import posts from './modules/posts'
import categories from './modules/categories'
import tags from './modules/tags'
import comments from './modules/comments'

const API = {
  users: users(BFF_URL),
  pages: pages(BFF_URL),
  posts: posts(BFF_URL),
  oauth: oauth(BFF_URL),
  media: media(BFF_URL),
  categories: categories(BFF_URL),
  tags: tags(BFF_URL),
  comments: comments(BFF_URL)
}

export default API
