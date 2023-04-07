import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const TableBodyRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}))

const TableHeadCell = styled(TableCell)(({ theme }) => ({
  background: theme.palette.common.black,
  color: theme.palette.common.white,
  fontSize: theme.spacing(2)
}))

const TableDetails = ({ data }) => {
  const header = data.withHeadings ? data.content[0] : []
  const rows = data.withHeadings ? data.content.slice(1) : data.content
  return <TableContainer component={Paper}>
    <TableContainer component={Table} style={{ width: '100%' }}>
      {header.length > 0 &&
      <TableHead>
        <TableRow>
          {header.map((cell, cellNo) => <TableHeadCell key={cellNo}>{cell}</TableHeadCell>)}
        </TableRow>
      </TableHead>
      }
      <TableBody>
        {rows.map((row, rowNo) =>
          <TableBodyRow key={rowNo}>
            {row.map((cell, cellNo) => <TableCell key={`cell-${rowNo}_${cellNo}`}>{cell}</TableCell>)}
          </TableBodyRow>
        )}
      </TableBody>
    </TableContainer>
  </TableContainer>
}

export default TableDetails
