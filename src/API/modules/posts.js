import { METHODS } from '../constants'
import axios from '../axios'

const posts = (host = '') => {
  return {
    addPost() {
      const options = { method: METHODS.POST }
      return axios.fetch(`${host}/api/posts`, options)
    },
    getPost(postId) {
      return axios.fetch(`${host}/api/posts/${postId}`)
    },
    updatePost(post) {
      const options = { method: METHODS.PUT, data: post }
      return axios.fetch(`${host}/api/posts/${post.postId}`, options)
    },
    getAllMyPosts(page, limit) {
      return axios.fetch(`${host}/api/posts/my-posts/page/${page}/limit/${limit}`)
    },
    getMyPostsCount() {
      return axios.fetch(`${host}/api/posts/my-posts/count`)
    }
  }
}


export default posts
