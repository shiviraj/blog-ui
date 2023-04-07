import type { PropsWithChildren } from 'react'
import React from 'react'
import parse from 'html-react-parser'

const RawHTML = ({ children, n2br = false }: PropsWithChildren<{ n2br?: boolean }>): JSX.Element => {
  if (n2br) {
    return parse((children as string).replace(/\n/g, '<br />')) as JSX.Element
  }
  return <>{children}</>
}

export default RawHTML
