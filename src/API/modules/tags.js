import axios from '../axios'
import { METHODS } from '../constants'

const tags = (host = '') => {
  return {
    addNewTag(value) {
      const options = { method: METHODS.POST, data: value }
      return axios.fetch(`${host}/api/tags`, options)
    },
    getTags(tagIds) {
      const options = { method: METHODS.POST, data: tagIds }
      return axios.fetch(`${host}/api/tags/tags`, options)
    },
    getSearchOptions(tagName) {
      return axios.fetch(`${host}/api/tags/${tagName}`)
    }
  }
}


export default tags
