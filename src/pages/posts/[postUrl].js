import { connect } from 'react-redux'
import Post from '../../modules/posts/Post'
import { fetchComments, fetchPost } from '../../modules/posts/action'

const mapStateToProps = (state) => ({ ...state.post })
const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postUrl) => fetchPost(dispatch, postUrl),
  fetchComments: (postId) => fetchComments(dispatch, postId)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
