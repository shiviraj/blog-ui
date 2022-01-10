import React from 'react'

const RawHTML = ({ children, n2br = false }) => {
  if (n2br)
    return <div dangerouslySetInnerHTML={{ __html: children && children.replace(/\n/g, '<br />') }} />
  return <>{children}</>
}

export default RawHTML
