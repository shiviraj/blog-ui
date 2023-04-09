import { Authors, Categories, Comments, Posts } from './modules'

const API = {
  authors: new Authors('/api/authors'),
  categories: new Categories('/api/categories'),
  comments: new Comments('/api/comments'),
  posts: new Posts('/api/posts')
  // pages: pages(BFF_URL),
  // oauth: oauth(BFF_URL),
}

export default API
