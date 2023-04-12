type Site = {
  tagLine?: string
  developer: {
    name: string
    url: string
  }
  title: string
}

const useSite = (): Site => {
  return { developer: { name: 'Shiviraj', url: 'https://shiviraj.com/about-me' }, title: 'Shivi Poetry' }
}

export default useSite
