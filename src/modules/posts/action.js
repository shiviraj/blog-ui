import API from '../../API'

export const POST = 'POST'
export const SET_POST = `SET_${POST}`

export const SET_LOADER = `${SET_POST}_LOADER`
export const SET_POST_COMMENTS = `${SET_POST}_COMMENTS`

export const setPost = (post) => ({ type: SET_POST, post })
export const setComments = (comments) => ({ type: SET_POST_COMMENTS, comments })
export const setLoader = (loader) => ({ type: SET_POST, loader })

export const fetchPost = async (dispatch, postUrl) => {
  dispatch(setLoader(true))
  try {
    const post = await API.posts.getPostByUrl(postUrl)
    dispatch(setPost(post))
  } finally {
    dispatch(setLoader(false))
  }
}

export const fetchComments = async (dispatch, postId) => {
  dispatch(setLoader(true))
  try {
    const comments = await API.posts.getComments(postId)
    dispatch(setComments(comments))
  } finally {
    dispatch(setLoader(false))
  }
}
