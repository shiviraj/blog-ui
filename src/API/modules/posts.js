import { METHODS } from '../constants'
import axios from '../axios'

const posts = (host = '') => {
  return {
    addPost() {
      const options = { method: METHODS.POST }
      return axios.fetch(`${host}/api/posts/author`, options)
    },
    getPost(postId) {
      return axios.fetch(`${host}/api/posts/${postId}/author`)
    },
    updatePost(post) {
      const options = { method: METHODS.PUT, data: post }
      return axios.fetch(`${host}/api/posts/${post.postId}/author`, options)
    },
    getAllMyPosts(page, limit) {
      return axios.fetch(`${host}/api/posts/author/my-posts/page/${page}/limit/${limit}`)
    },
    getMyPostsCount() {
      return axios.fetch(`${host}/api/posts/author/my-posts/count`)
    },
    isUrlAvailable(postId, url) {
      return axios.fetch(`${host}/api/posts/${postId}/author/url-available/${url}`)
    },
    getPostByUrl(postUrl) {
      return axios.fetch(`${host}/api/posts/${postUrl}`)
    },
    addLikeOrDislike(postId, likeOrDislike) {
      const options = { method: METHODS.PUT, data: likeOrDislike }
      return axios.fetch(`${host}/api/posts/${postId}`, options)
    },
    getPosts(page) {
      return axios.fetch(`${host}/api/posts/page/${page}`)
    },
    getPostsCount() {
      return axios.fetch(`${host}/api/posts/count`)
    },
    getPostsByAuthor(userId) {
      return axios.fetch(`${host}/api/posts/author/${userId}`)
    }
  }
}


export default posts
