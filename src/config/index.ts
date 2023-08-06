export const BACKEND_URL = `${process.env.BACKEND_URL ?? ''}/api`
export const config = {
  author: {
    baseUrl: `${BACKEND_URL}/authors`,
    getAuthorPath: '/{username}',
    getPostsCountPath: '/{username}/count',
    getPostsPath: '/{username}/page/{page}',
    getVisitorIdPath: '/visitor',
    loginPath: '/login',
    logoutPath: '/logout',
    validatePath: '/validate'
  },
  category: {
    baseUrl: `${BACKEND_URL}/categories`,
    getPostsPath: '/{categoryUrl}/page/{page}',
    getPostsCountPath: '/{categoryUrl}/count',
    getCategoryPath: '/{categoryUrl}'
  }
}
