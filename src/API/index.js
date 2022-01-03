import users from './modules/user'
import pages from './modules/pages'
import {BFF_URL} from '../config/config'
import oauth from './modules/oauth'

const API = {
  users: users(BFF_URL),
  pages: pages(BFF_URL),
  oauth: oauth(BFF_URL)
}

export default API
