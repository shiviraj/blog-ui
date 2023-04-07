enum BlockType {
  header = 'header',
  paragraph = 'paragraph',
  delimiter = 'delimiter',
  image = 'image',
  quote = 'quote',
  list = 'list',
  table = 'table',
  checklist = 'checklist',
  raw = 'raw'
}

interface BaseBlock {
  readonly type: BlockType
  readonly id: string
  readonly data?: Record<string, unknown>
}

export interface DelimiterBlock extends BaseBlock {
  type: BlockType.delimiter
}

export interface ParagraphBlock extends BaseBlock {
  type: BlockType.paragraph
  data: { text: string }
}

export interface HeaderBlock extends BaseBlock {
  type: BlockType.header
  data: { level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
}

export interface ImageBlock extends BaseBlock {
  type: BlockType.image
  data: {
    stretched: boolean
    caption: string
    file: {
      url: string
    }
  }
}

export interface QuoteBlock extends BaseBlock {
  type: BlockType.quote
  data: {
    alignment: 'start' | 'end' | 'center'
    text: string
    caption: string
  }
}

export interface ListBlock extends BaseBlock {
  type: BlockType.list
  data: {
    style: 'ordered' | 'unordered'
    items: string[]
  }
}

export interface TableBlock extends BaseBlock {
  type: BlockType.table
  data: Record<string, unknown>
}

export interface CheckListBlock extends BaseBlock {
  type: BlockType.checklist
  data: {
    items: Array<{ text: string }>
  }
}

export interface RawBlock extends BaseBlock {
  type: BlockType.raw
  data: {
    html: string
  }
}

export interface BlockMap {
  header: HeaderBlock
  paragraph: ParagraphBlock
  delimiter: DelimiterBlock
  image: ImageBlock
  quote: QuoteBlock
  list: ListBlock
  table: TableBlock
  checklist: CheckListBlock
  raw: RawBlock
}

export interface PostContentType {
  time: string
  blocks: Array<BlockMap[keyof BlockMap]>
}
