import EditPost from '../../../../modules/role/posts/EditPost'
import { connect } from 'react-redux'
import { getPost, savePost, setPost } from '../../../../modules/role/posts/action'

const mapStateToProps = (state) => ({ post: state.post.post, loader: state.post.loader })
const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postId) => getPost(dispatch, postId),
  savePost: (post, postStatus) => savePost(dispatch, post, postStatus),
  setPost: (post) => dispatch(setPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
