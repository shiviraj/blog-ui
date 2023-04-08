import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import type { CategoryType } from '../../../api/dto'
import api from '../../../api'
import CategoriesPage, { getStaticProps as getStaticPropsFn } from './page/[page]'

const Category: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  return <CategoriesPage {...props} />
}

export const getStaticProps = getStaticPropsFn
export const getStaticPaths: GetStaticPaths = async () => {
  const categories: CategoryType[] = await api.categories.getAllCategories()
  const urls = categories.map(category => category.url)
  return { paths: urls.map(url => ({ params: { categoryUrl: url } })), fallback: false }
}

export default Category
