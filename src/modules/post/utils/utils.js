const findNestedItem = (list, commentId) => {
  for (let index = 0; index < list.length; index++) {
    const comment = list[index]
    if (comment.commentId === commentId) return comment
    if (comment.child) {
      const item = findNestedItem(comment.child, commentId)
      if (item) return item
    }
  }
  return null
}

export const createNestedList = (list) => {
  list.sort((a, b) => a.commentId - b.commentId)
  return list.reduce((nestedList, comment) => {
    if (comment.parentComment) {
      const listItem = findNestedItem(list, comment.parentComment)
      if (listItem)
        listItem.child = listItem.child ? listItem.child.concat(comment) : [comment]
    } else {
      nestedList.push(comment)
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

export const updateComment = (nestedList, comment) => {
  const list = sortList(nestedList).filter(({ commentId }) => commentId !== comment.commentId)
  return createNestedList([...list, comment])
}


