import axios from '../axios'
import {METHODS} from '../constants'

const oauth = (host = '') => {
  return {
    getClientId() {
      return axios.fetch(`${host}/api/oauth/client-id`)
    },
    signIn(code) {
      return axios.fetch(`${host}/api/oauth/code`, {data: {code}, method: METHODS.POST})
    }
  }
}


export default oauth
