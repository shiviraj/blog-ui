import { useCallback, useState } from 'react'

export type PaginationType = { page: number; pageOptions: number[]; rowsPerPage: number; total: number }
const usePagination = (
  total = 1
): {
  pagination: PaginationType
  setTotalCount: (count: number) => void
  setPagination: (pagination: PaginationType) => void
} => {
  const [pagination, setPagination] = useState<PaginationType>({ page: 0, total, pageOptions: [], rowsPerPage: 10 })

  const setTotalCount = useCallback(
    (count: number) => {
      setPagination({ ...pagination, total: count, pageOptions: [10, 25, 50, 100] })
    },
    [setPagination]
  )

  return { pagination, setTotalCount, setPagination }
}

export default usePagination
