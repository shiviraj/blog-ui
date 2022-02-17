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
    },
    getCategories(categories) {
      const options = { method: METHODS.POST, data: categories }
      return axios.fetch(`${host}/api/categories/categories`, options)
    },
    getPosts(categoryUrl, page) {
      return axios.fetch(`${host}/api/categories/${categoryUrl}/page/${page}`)
    },
    getPostsCount(categoryUrl) {
      return axios.fetch(`${host}/api/categories/${categoryUrl}/count`)
    }
  }
}


export default categories
