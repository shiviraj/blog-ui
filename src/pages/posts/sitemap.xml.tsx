import type { GetServerSideProps, NextPage } from 'next'
import { getAllPosts } from './[postUrl]'
import { formatDate } from '../../utils'
import { fetchSite } from '../../context'

const Sitemap: NextPage = () => null
export default Sitemap
const generateSiteMap = async (): Promise<string> => {
  const site = await fetchSite()
  const allPosts = await getAllPosts()
  const urls = allPosts.map(post => {
    return `<url>
                <loc>https://${site.hostname}/posts/${post.url}</loc>
                <lastmod>${formatDate(post.lastUpdateOn, 'YYYY-MM-DD')}</lastmod>
            </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${urls.join('')}
          </urlset>`
}

export const getServerSideProps: GetServerSideProps<Record<string, unknown>> = async ctx => {
  ctx.res.setHeader('Content-Type', 'text/xml')
  const xml = await generateSiteMap()
  ctx.res.write(xml)
  ctx.res.end()

  return { props: {} }
}
