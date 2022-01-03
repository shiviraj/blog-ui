import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import Code from '@editorjs/code'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import SimpleImage from '@editorjs/simple-image'
import Header from '@editorjs/header'
import { createReactEditorJS } from 'react-editor-js'

const CustomEditor = ({ data, handleChange }) => {
  const EDITOR_JS_TOOLS = {
    embed: Embed,
    header: Header,
    list: List,
    code: Code,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByFile(file) {
            // let formData = new FormData()
            // formData.append('images', file)
            // return API.imageUpload(formData).then((res) => {
            //   imageArray.push(res.data.data)
            //   return {
            return { success: 1, file: { url: 'res.data.data' } }
            // }
          }
// )
// }
        }
      }
    },
    quote: Quote,
    checklist: CheckList, delimiter: Delimiter, inlineCode: InlineCode, simpleImage: SimpleImage
  }
  
  const ReactEditorJS = createReactEditorJS()
  
  return <ReactEditorJS onChange={handleChange} tools={EDITOR_JS_TOOLS}
                        defaultValue={data} />
}

export default CustomEditor
