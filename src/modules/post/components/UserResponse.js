import { useDispatch, useSelector } from 'react-redux'
import API from '../../../API'
import { setPost } from '../action'
import UserActivity from './components/UserActivity'
import { usePopUp } from '../../../common/components/PopUp'


const UserResponse = ({ post, comments }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const popup = usePopUp()
  const handleLikeOrDislike = (type) => () => {
    const key = `${type}s`
    const action = post[key].includes(user.userId) ? 'REMOVE' : 'ADD'
    if (user.userId) {
      API.posts.addLikeOrDislike(post.postId, { action: `${action}_${type}`.toUpperCase() })
        .then((post) => dispatch(setPost(post)))
    } else {
      popup.onOpen('clap on story')
    }
  }
  
  return <UserActivity likes={post.likes} mt={2} mb={2}
                       dislikes={post.dislikes}
                       handleLikeOrDislike={handleLikeOrDislike}
                       list={comments} />
}

export default UserResponse
