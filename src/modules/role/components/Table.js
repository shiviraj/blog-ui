import lodash from 'lodash'
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { styled } from '@mui/material'

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

const TableData = ({ columns, rows, pagination, setPagination }) => {
  const handleChangePage = (event, newPage) => setPagination({ ...pagination, page: newPage })
  
  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, page: 0, rowsPerPage: Number(event.target.value) })
  }
  
  return <Stack boxShadow={4} component={Paper}>
    <TableContainer style={{ maxHeight: '75vh' }}>
      <Table stickyHeader>
        <TableHead>
          <TableHeadRow>
            {columns.map((column, index) => <TableCell key={column.id + index}>{column.label}</TableCell>)}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => <TableBodyRow hover key={index}>
            {columns.map((column, id) => {
              const value = lodash.get(row, column.id)
              return <TableCell key={column.id + id} style={{ margin: 0, padding: 8 }}>
                {column.format ? column.format(value) : value}
              </TableCell>
            })}
          </TableBodyRow>)}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[...pagination.pageOptions]}
      component='div'
      count={pagination.total}
      rowsPerPage={pagination.rowsPerPage}
      page={pagination.page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Stack>
  
}

export default TableData
