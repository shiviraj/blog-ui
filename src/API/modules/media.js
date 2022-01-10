import axios from '../axios'
import { METHODS } from '../constants'

const media = (host = '') => {
  return {
    uploadImage(file) {
      const formData = new FormData()
      formData.append('images', file)
      return axios.fetch(`${host}/api/media/upload`, { data: formData, method: METHODS.POST })
    }
  }
}

export default media
