export const getById = <D extends Record<string, unknown>>(data: D, id: string): string => {
  const ids = id.split('.')
  const lastId = ids.last()

  const result = ids.slice(0, ids.lastIndex()).reduce<D>((currentData, currentId) => {
    return currentData[currentId] as D
  }, data)
  if (lastId) {
    return (result[lastId] as string) || '-'
  }
  return '-'
}
