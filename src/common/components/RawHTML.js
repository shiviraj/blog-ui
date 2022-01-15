import React from 'react'
import parse from 'html-react-parser'

const RawHTML = ({ children, n2br = false }) => {
  if (n2br)
    return parse(children.replace(/\n/g, '<br />'))
  return <>{children}</>
}

export default RawHTML
