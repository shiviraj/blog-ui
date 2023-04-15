import type { CategoryType } from '../../../../api/dto'

type CategoryTypeWithChild = CategoryType & { child?: CategoryType[] }

// eslint-disable-next-line complexity
const findNestedItem = (list: CategoryTypeWithChild[], categoryId: string): CategoryTypeWithChild | null => {
  for (const category of list) {
    if (category.categoryId === categoryId) {
      return category
    }
    if (category.child) {
      const item = findNestedItem(category.child, categoryId)
      if (item) {
        return item
      }
    }
  }
  return null
}

const createNestedList = (list: CategoryType[]): CategoryType[] => {
  list.sort()
  return list.reduce<CategoryType[]>((nestedList, category) => {
    if (category.parentId) {
      const listItem = findNestedItem(list, category.parentId)
      if (listItem) {
        listItem.child = listItem.child ? listItem.child.concat(category) : [category]
      }
    } else {
      nestedList.push(category)
    }
    return nestedList
  }, [])
}

const sortList = (list: CategoryTypeWithChild[], level = 0): Array<CategoryType & { level: number }> => {
  return list.reduce<Array<CategoryType & { level: number }>>((sortedList, { child, ...item }) => {
    sortedList.push({ ...item, level })
    return child ? sortedList.concat(...sortList(child, level + 1)) : sortedList
  }, [])
}

export const sort = (list: CategoryType[]): Array<CategoryType & { level: number }> => {
  const nestedList = createNestedList(list)
  return sortList(nestedList)
}
