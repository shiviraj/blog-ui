import Login from '../../modules/login'
import API from '../../API'

export const getStaticProps = async () => {
  const clientId = await API.oauth.getClientId()
  return { props: { clientId }, revalidate: 86400 }
}

export default Login
