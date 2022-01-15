import API from '../../../API'

export const EDIT_POST = 'EDIT_POST'

export const SET_LOADER = `SET_${EDIT_POST}_LOADER`
export const GET_EDIT_POST = `GET_${EDIT_POST}`
export const SET_EDIT_POST = `SET_${EDIT_POST}`

export const setEditPost = (post) => ({ type: SET_EDIT_POST, post })

export const saveEditPost = (dispatch, post, postStatus = 'DRAFT') => {
  dispatch({ type: SET_LOADER, loader: true })
  return API.posts.updatePost({ ...post, postStatus })
    .then((post) => setEditPost(post))
    .then(() => {
      dispatch({ type: SET_LOADER, loader: false })
      return { message: 'Successfully updated post' }
    })
    .catch(() => {
      dispatch({ type: SET_LOADER, loader: false })
      throw new Error('Failed to updated post')
    })
}

export const getEditPost = async (dispatch, postId) => {
  API.posts.getPost(postId)
    .then(post => dispatch({ type: GET_EDIT_POST, post }))
}
