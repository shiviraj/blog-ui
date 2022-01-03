import Role from '../../modules/role'
import Dashboard from '../../modules/role/Dashboard'

export default function Index() {
  return <Role title={'Dashboard'} component={Dashboard} />
}
