import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import Code from '@editorjs/code'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Raw from '@editorjs/raw'
import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import SimpleImage from '@editorjs/simple-image'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import { createReactEditorJS } from 'react-editor-js'
import { initHeaders } from '../../API/axios'

const CustomEditor = ({ id, data, handleChange }) => {
  const EDITOR_JS_TOOLS = {
    embed: { class: Embed },
    raw: Raw,
    table: Table,
    header: { class: Header, inlineToolbar: true, shortcut: 'CMD+SHIFT+H' },
    list: { class: List, inlineToolbar: true, shortcut: 'CMD+SHIFT+L' },
    marker: { class: Marker, shortcut: 'CMD+SHIFT+M' },
    delimiter: { class: Delimiter },
    inlineCode: { class: InlineCode, shortcut: 'OPTION+CMD+SHIFT+C' },
    code: Code,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        endpoints: {
          byFile: `http://localhost:3001/api/media/upload-image/${id}`,
          byUrl: `http://localhost:3001/api/media/upload-image-byUrl/${id}`
        },
        additionalRequestHeaders: { authorization: initHeaders().authorization }
      },
      shortcut: 'CMD+SHIFT+I'
    },
    quote: { class: Quote, inlineToolbar: true, shortcut: 'CMD+SHIFT+Q' },
    checklist: CheckList,
    simpleImage: SimpleImage
  }
  
  const ReactEditorJS = createReactEditorJS()
  
  return <ReactEditorJS onChange={handleChange} tools={EDITOR_JS_TOOLS} defaultValue={data} />
}

export default CustomEditor
