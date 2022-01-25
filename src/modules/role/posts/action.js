import API from '../../../API'

export const EDIT_POST = 'EDIT_POST'

export const SET_LOADER = `SET_${EDIT_POST}_LOADER`
export const GET_EDIT_POST = `GET_${EDIT_POST}`
export const SET_EDIT_POST = `SET_${EDIT_POST}`
export const SET_EDIT_POST_CATEGORIES = `SET_${EDIT_POST}_CATEGORIES`
export const SET_EDIT_POST_TAGS = `SET_${EDIT_POST}_TAGS`

export const setEditPost = (post) => ({ type: SET_EDIT_POST, post })
export const setLoader = (loader) => ({ type: SET_LOADER, loader })
export const setCategories = (categories) => ({ type: SET_EDIT_POST_CATEGORIES, categories })
export const setTags = (tags) => ({ type: SET_EDIT_POST_TAGS, tags })

export const saveEditPost = (dispatch, post, postStatus = 'DRAFT') => {
  dispatch(setLoader(true))
  return API.posts.updatePost({ ...post, postStatus })
    .then((editPost) => setEditPost(editPost))
    .then(() => {
      dispatch({ type: SET_LOADER, loader: false })
      return { message: 'Successfully updated post' }
    })
    .catch(() => {
      dispatch(setLoader(false))
      throw new Error('Failed to updated post')
    })
}

export const getEditPost = async (dispatch, postId) => {
  try {
    dispatch(setLoader(true))
    const post = await API.posts.getPost(postId)
    dispatch({ type: GET_EDIT_POST, post })
    const categories = await API.categories.getCategories(post.categories)
    dispatch(setCategories(categories))
    const tags = await API.tags.getTags(post.tags)
    dispatch(setTags(tags))
  } finally {
    dispatch(setLoader(false))
  }
}
