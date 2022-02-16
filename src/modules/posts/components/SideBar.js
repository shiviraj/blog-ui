import { useEffect, useState } from 'react'
import API from '../../../API'
import LinksView from './LinksView'
import { styled } from '@mui/styles'
import { Box } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  width: theme.spacing(40),
  [theme.breakpoints.down('lg')]: {
    width: '98%',
    maxWidth: theme.spacing(105),
    alignSelf: 'center'
  }
}))

const Sidebar = () => {
  const [recentPosts, setRecentPosts] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    API.posts.getPosts(1)
      .then((posts) => {
        const links = posts.map(({ title, url }) => ({ name: title, url: `/posts/${url}` }))
        setRecentPosts(links)
      })
    API.categories.getAllCategories()
      .then((categories) => {
        const links = categories.map(({ name, url }) => ({ name, url: `/categories/${url}/page/1` }))
        setCategories(links)
      })
  }, [])
  
  return <Container>
    <LinksView links={recentPosts} title={'Recent Posts'} />
    <LinksView links={categories} title={'Categories'} />
  </Container>
}

export default Sidebar
