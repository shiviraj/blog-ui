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
  },
  comment: {
    baseUrl: `${BACKEND_URL}/comments`,
    addCommentPath: '/{postId}',
    toggleLikePath: '/{commentId}',
    updateStatusPath: '/{commentId}/update-status'
  },
  site: {
    baseUrl: `${BACKEND_URL}/site`
  },
  tag: {
    baseUrl: `${BACKEND_URL}/tags`,
    getPostsPath: '/{tagUrl}/page/{page}',
    getPostsCountPath: '/{tagUrl}/count',
    getTagPath: '/{tagUrl}'
  },
  post: {
    baseUrl: `${BACKEND_URL}/posts`,
    validatedBaseUrl: `${BACKEND_URL}/posts/validate`,
    getPostByUrlPath: '/{postUrl}',
    getPostsPath: '/page/{page}',
    getPostsCountPath: '/count',
    toggleLikePath: '/{postId}/user-reaction',
    getPostsByPostIdPath: '/{postId}',
    publishPath: '/{postId}/publish',
    isUrlAvailablePath: '/{postId}/url-available'
  }
}
