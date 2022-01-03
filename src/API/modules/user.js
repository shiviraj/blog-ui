import axios from '../axios'
import {METHODS} from '../constants'

const user = (host = '') => {
  return {
    validateUser() {
      return axios.fetch(`${host}/api/users/validate`)
    },
    register(user) {
      const options = {method: METHODS.POST, data: user}
      return axios.fetch(`${host}/api/users`, options)
    },
    logout() {
      return axios.fetch(`${host}/api/users/logout`)
    },
    getAllUsers() {
      return axios.fetch(`${host}/api/users`)
    }
  }
}


export default user
