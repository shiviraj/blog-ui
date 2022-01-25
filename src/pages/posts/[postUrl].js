import { fetchPost } from '../../modules/posts/action'
import Home from '../../modules/home'

const mapStateToProps = (state) => ({ ...state.post })
const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postUrl) => fetchPost(dispatch, postUrl)
})

// export default connect(mapStateToProps, mapDispatchToProps)(Post)
export default Home
