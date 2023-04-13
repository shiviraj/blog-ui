import Role from '../../modules/role'
import Dashboard from '../../modules/role/Dashboard'
import type { NextPage } from 'next'

const Index:NextPage = () => <Role title={'Dashboard'} component={Dashboard} />

export default Index
