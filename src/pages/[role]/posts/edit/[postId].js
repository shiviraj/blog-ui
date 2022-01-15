import EditPost from '../../../../modules/role/posts/EditPost'
import { connect } from 'react-redux'
import { getEditPost, saveEditPost, setEditPost } from '../../../../modules/role/posts/action'

const mapStateToProps = (state) => ({ post: state.editPost.post, loader: state.editPost.loader })
const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postId) => getEditPost(dispatch, postId),
  savePost: (post, postStatus) => saveEditPost(dispatch, post, postStatus),
  setPost: (post) => dispatch(setEditPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
