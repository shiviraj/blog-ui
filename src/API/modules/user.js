import axios from '../axios'

const user = (host = '') => {
  return {
    validateUser() {
      return axios.fetch(`${host}/api/users/validate`)
    },
    logout() {
      return axios.fetch(`${host}/api/users/logout`)
    },
    getAuthor(authorId) {
      return axios.fetch(`${host}/api/users/${authorId}`)
    }
  }
}


export default user
