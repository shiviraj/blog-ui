const findNestedItem = (list, categoryId) => {
  for (let index = 0; index < list.length; index++) {
    const category = list[index]
    if (category.categoryId === categoryId) return category
    if (category.child) {
      const item = findNestedItem(category.child, categoryId)
      if (item) return item
    }
  }
  return null
}

const createNestedList = (list) => {
  list.sort((a, b) => a.categoryId - b.categoryId)
  return list.reduce((nestedList, category) => {
    if (category.parentCategory) {
      const listItem = findNestedItem(list, category.parentCategory)
      if (listItem)
        listItem.child = listItem.child ? listItem.child.concat(category) : [category]
    } else {
      nestedList.push(category)
    }
    return nestedList
  }, [])
}

const sortList = (list, level = 0) => {
  return list.reduce((sortedList, { child, ...item }) => {
    sortedList.push({ ...item, level })
    return child ? sortedList.concat(...sortList(child, level + 1)) : sortedList
  }, [])
}

export const sort = (list) => {
  const nestedList = createNestedList(list)
  return sortList(nestedList)
}
