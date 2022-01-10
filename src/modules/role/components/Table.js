import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import lodash from 'lodash'

const useStyles = makeStyles((theme) => ({
  head: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  tableBody: {
    maxHeight: theme.spacing(100)
  },
  body: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  },
  cell: {
    margin: 0,
    padding: 0,
    textAlign: 'center'
  }
}))

const TableData = ({ columns, rows, pagination, setPagination, id }) => {
  const classes = useStyles()
  
  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage })
  }
  
  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, page: 0, rowsPerPage: +event.target.value })
  }
  
  return <Box boxShadow={4}>
    <TableContainer className={classes.tableBody}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={column.id + index} className={classes.head}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) =>
            <TableRow hover key={index} className={classes.body}>
              {columns.map((column, id) => {
                const value = lodash.get(row, column.id)
                return (
                  <TableCell key={column.id + id} className={classes.cell}>
                    {column.format ? column.format(value) : value}
                  </TableCell>
                )
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={pagination.pageOptions}
      component='div'
      count={pagination.total}
      rowsPerPage={pagination.rowsPerPage}
      page={pagination.page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </Box>
  
}

export default TableData
