import type { GetServerSideProps, NextPage } from 'next'
import { formatDate } from '../../utils'
import { fetchSite } from '../../context'
import type { MetaParamsType } from '../../modules/meta'
import { getAuthorPaths, getCategoriesPaths, getTagsPaths, Meta } from '../../modules/meta'

const Sitemap: NextPage = () => null
export default Sitemap
const generateSiteMap = async (meta: string): Promise<string> => {
  const site = await fetchSite()
  const paths: Array<{ params: MetaParamsType }> = []
  if (meta === Meta.TAGS) {
    const tagsPaths = await getTagsPaths()
    paths.push(...tagsPaths)
  }
  if (meta === Meta.AUTHORS) {
    const authorsPaths = await getAuthorPaths()
    paths.push(...authorsPaths)
  }
  if (meta === Meta.CATEGORIES) {
    const categoriesPaths = await getCategoriesPaths()
    paths.push(...categoriesPaths)
  }
  const urls = paths.map((path: { params: MetaParamsType }) => {
    return `<url>
                <loc>https://${site.hostname}/${path.params.meta}/${path.params.metaId}</loc>
                <lastmod>${formatDate(path.params.createdAt, 'YYYY-MM-DD')}</lastmod>
            </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${urls.join('')}
          </urlset>`
}

export const getServerSideProps: GetServerSideProps<Record<string, unknown>> = async ctx => {
  ctx.res.setHeader('Content-Type', 'text/xml')
  const xml = await generateSiteMap(ctx.params?.meta as string)
  ctx.res.write(xml)
  ctx.res.end()

  return { props: {} }
}
