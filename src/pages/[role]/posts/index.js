import Role from '../../../modules/role'
import Posts from '../../../modules/role/Posts'

export default function Post() {
  return <Role title={'All Posts'} component={Posts} />
}
