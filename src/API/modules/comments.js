import axios from '../axios'
import { METHODS } from '../constants'

const comments = (host = '') => {
  return {
    addComment(postId, comment) {
      const options = { method: METHODS.POST, data: comment }
      return axios.fetch(`${host}/api/comments/${postId}`, options)
    },
    getComments(postId) {
      return axios.fetch(`${host}/api/comments/${postId}`)
    }
  }
}


export default comments
