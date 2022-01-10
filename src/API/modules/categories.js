import axios from '../axios'
import { METHODS } from '../constants'

const categories = (host = '') => {
  return {
    getAllCategories() {
      return axios.fetch(`${host}/api/categories`)
    },
    addNewCategory(value) {
      const options = { method: METHODS.POST, data: value }
      return axios.fetch(`${host}/api/categories`, options)
    }
  }
}


export default categories
