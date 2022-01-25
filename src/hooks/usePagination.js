import { useCallback, useState } from 'react'
import lodash from 'lodash'

const usePagination = (total = 1) => {
  const [pagination, setPagination] = useState({ page: 0, total, pageOptions: [], rowsPerPage: 10 })
  
  const setTotalPages = useCallback((count) => {
    const pageOptions = lodash.uniq([10, 25, 50, 100, count].filter((it) => it <= count))
    setPagination({ ...pagination, total: count, pageOptions })
  }, [setPagination])
  
  return { pagination, setPagination, setTotalPages }
}

export default usePagination
