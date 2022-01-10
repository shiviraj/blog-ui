import axios from '../axios'
import { METHODS } from '../constants'

const tags = (host = '') => {
  return {
    addNewTag(value) {
      const options = { method: METHODS.POST, data: value }
      return axios.fetch(`${host}/api/tags`, options)
    }
  }
}


export default tags
