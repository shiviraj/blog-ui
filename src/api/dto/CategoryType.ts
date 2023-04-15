export interface CategoryType extends Record<string, unknown> {
  parentId: string
  categoryId: string
  name: string
  url: string
  authorId: string
  createdAt: string
}
