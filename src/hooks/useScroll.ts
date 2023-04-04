const useScroll = (selector?: string) => {
  const scroll = (_e: unknown, currentSelector?: string) => {
    if (currentSelector || selector) {
      const anchor = document.querySelector((currentSelector ?? selector)!)
      anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  return { scroll }
}

export default useScroll
