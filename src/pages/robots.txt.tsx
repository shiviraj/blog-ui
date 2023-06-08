import type { GetServerSideProps, NextPage } from 'next'
import { fetchSite } from '../context'

const Robots: NextPage = () => null
export default Robots
const generateRobots = async (): Promise<string> => {
  const site = await fetchSite()
  return `User-agent: *

#Sitemap
Sitemap: https://${site.hostname}/posts/sitemap.xml
Sitemap: https://${site.hostname}/sitemap.xml`
}

export const getServerSideProps: GetServerSideProps<Record<string, unknown>> = async ctx => {
  ctx.res.setHeader('Content-Type', 'text/plain')
  const robots = await generateRobots()
  ctx.res.write(robots)
  ctx.res.end()

  return { props: {} }
}
