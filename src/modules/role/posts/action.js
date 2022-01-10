import API from '../../../API'

export const POST = 'POST'

export const SET_LOADER = `SET_${POST}_LOADER`
export const GET_POST = `GET_${POST}`
export const SET_POST = `SET_${POST}`

export const setPost = (post) => ({ type: SET_POST, post })

export const savePost = (dispatch, post, postStatus = 'DRAFT') => {
  dispatch({ type: SET_LOADER, loader: true })
  API.posts.updatePost({ ...post, postStatus })
    .then(setPost)
    .catch(() => ({}))
    .then(dispatch({ type: SET_LOADER, loader: false }))
}

export const getPost = async (dispatch, postId) => {
  API.posts.getPost(postId)
    .then(post => dispatch({ type: GET_POST, post }))
}
