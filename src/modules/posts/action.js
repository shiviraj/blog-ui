import API from '../../API'

export const POST = 'POST'
export const SET_POST = `SET_${POST}`

export const SET_LOADER = `${SET_POST}_LOADER`
export const SET_POST_COMMENTS = `${SET_POST}_COMMENTS`
export const SET_POST_TAGS = `${SET_POST}_TAGS`
export const SET_POST_CATEGORIES = `${SET_POST}_CATEGORIES`
export const SET_POST_AUTHOR = `${SET_POST}_AUTHOR`

export const setLoader = (loader) => ({ type: SET_POST, loader })
export const setPost = (post) => ({ type: SET_POST, post })
export const setComments = (comments) => ({ type: SET_POST_COMMENTS, comments })
export const setAuthor = (author) => ({ type: SET_POST_AUTHOR, author })
export const setTags = (tags) => ({ type: SET_POST_TAGS, tags })
export const setCategories = (categories) => ({ type: SET_POST_CATEGORIES, categories })

export const fetchPost = async (dispatch, postUrl) => {
  dispatch(setLoader(true))
  try {
    const post = await API.posts.getPostByUrl(postUrl)
    dispatch(setPost(post))
    const author = await API.users.getAuthor(post.author).catch()
    dispatch(setAuthor(author))
    const categories = await API.categories.getCategories(post.categories).catch()
    dispatch(setCategories(categories))
    const tags = await API.tags.getTags(post.tags).catch()
    dispatch(setTags(tags))
    const comments = await API.comments.getComments(post.postId).catch()
    dispatch(setComments(comments))
  } finally {
    dispatch(setLoader(false))
  }
}
