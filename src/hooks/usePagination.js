import { useCallback, useState } from 'react'
import lodash from 'lodash'


const usePagination = (total = 1) => {
  const [pagination, setPagination] = useState({ page: 0, total, pageOptions: [], rowsPerPage: 10 })
  
  const setTotalPages = useCallback((total) => {
    const pageOptions = lodash.uniq([10, 25, 50, 100, total].filter(it => it <= total))
    setPagination({ ...pagination, total, pageOptions })
  }, [setPagination])
  
  return { pagination, setPagination, setTotalPages }
}

export default usePagination
