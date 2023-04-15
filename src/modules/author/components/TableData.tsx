import {
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { getById } from './utils'
import { usePagination } from '../../../hooks'

const TableHeadRow = styled(TableRow)(({ theme }) => ({
  '&>*': {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  }
}))

const TableBodyRow = styled(TableRow)(({ theme }) => ({
  padding: 0,
  margin: 0,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}))

type TableDataProps = {
  columns: Array<{ id: string; label: string }>
  rows: Array<Record<string, unknown>>
  Action?: { id: string; Component: (props: { id: string }) => JSX.Element }
}
const TableData = ({ columns, rows, Action }: TableDataProps): JSX.Element => {
  const { pagination, setTotalCount, setPagination } = usePagination(1)
  const [visibleRows, setVisibleRows] = useState<Array<Record<string, unknown>>>([])

  useEffect(() => {
    setTotalCount(rows.length)
  }, [])

  useEffect(() => {
    setVisibleRows(rows.slice(pagination.page * pagination.rowsPerPage, (pagination.page + 1) * pagination.rowsPerPage))
  }, [pagination])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination({ ...pagination, page: newPage })
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPagination({ ...pagination, page: 0, rowsPerPage: Number(event.target.value) })
  }

  return (
    <Stack boxShadow={4} component={Paper}>
      <TableContainer style={{ maxHeight: '80vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableHeadRow>
              <TableCell>S.No.</TableCell>
              {columns.map((column, index) => (
                <TableCell key={`${column.id}_${index}`}>{column.label}</TableCell>
              ))}
              {Action && <TableCell>Action</TableCell>}
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableBodyRow hover key={`row-no-${index + 1}`}>
                <TableCell>{index + 1}</TableCell>
                {columns.map((column, id) => {
                  return <TableCell key={`${column.id}_${id}`}>{getById(row, column.id)}</TableCell>
                })}
                {Action && (
                  <TableCell>
                    <Action.Component id={getById(row, Action.id)} />
                  </TableCell>
                )}
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[...pagination.pageOptions]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  )
}

export default TableData
