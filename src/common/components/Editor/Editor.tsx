import React, { memo, useEffect, useRef } from 'react'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_TOOLS } from './tools'

type Props = {
  data?: OutputData
  onChange(val: OutputData): void
  holder: string
}

const EditorBlock = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS>()

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api) {
          const data = await api.saver.save()
          onChange(data)
        }
      })
    }

    return () => {
      if (ref.current?.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return <div id={holder} />
}

export default memo(EditorBlock)
