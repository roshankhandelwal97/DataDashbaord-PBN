import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
} from '@mui/material';

const DataTable = ({ data }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Adjusted for 0-based indexing
  const rowsPerPage = 10; // Number of records per page
  const [sortedData, setSortedData] = useState([...data]); // Track sorted data

  // Update sortedData whenever the original data changes
  useEffect(() => {
    setSortedData([...data]);
  }, [data]);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(column);

    const sorted = [...data].sort((a, b) => {
      if (newOrder === 'asc') {
        return a[column] < b[column] ? -1 : 1;
      }
      return a[column] > b[column] ? -1 : 1;
    });
    setSortedData(sorted);
  };

  // Calculate records to display for the current page
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
      <Table>
        {/* Table Headers */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: '#1e293b', // Header background color
                color: '#ffffff', // Header text color
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '0.875rem',
              }}
            >
              <TableSortLabel
                active={orderBy === 'paytype_id'}
                direction={orderBy === 'paytype_id' ? order : 'asc'}
                onClick={() => handleSort('paytype_id')}
                sx={{
                  color: '#ffffff', // Sort icon color
                  '&:hover': {
                    color: '#f9d342', // Hover color for header text
                  },
                }}
              >
                Pay Type ID
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              <TableSortLabel
                active={orderBy === 'amount'}
                direction={orderBy === 'amount' ? order : 'asc'}
                onClick={() => handleSort('amount')}
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    color: '#f9d342',
                  },
                }}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              <TableSortLabel
                active={orderBy === 'date'}
                direction={orderBy === 'date' ? order : 'asc'}
                onClick={() => handleSort('date')}
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    color: '#f9d342',
                  },
                }}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              <TableSortLabel
                active={orderBy === 'provider_id'}
                direction={orderBy === 'provider_id' ? order : 'asc'}
                onClick={() => handleSort('provider_id')}
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    color: '#f9d342',
                  },
                }}
              >
                Provider ID
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              <TableSortLabel
                active={orderBy === 'employee_type_id'}
                direction={orderBy === 'employee_type_id' ? order : 'asc'}
                onClick={() => handleSort('employee_type_id')}
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    color: '#f9d342',
                  },
                }}
              >
                Employee Type ID
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff', // Alternate row colors
                '&:hover': {
                  backgroundColor: '#e0f7fa', // Row hover color
                },
              }}
            >
              <TableCell
                align="center"
                sx={{
                  color: orderBy === 'paytype_id' ? '#183168' : '#1e293b', // Highlight sorted column
                  fontWeight: orderBy === 'paytype_id' ? 'bold' : 'normal',
                }}
              >
                {row.paytype_id}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: orderBy === 'amount' ? '#183168' : '#1e293b',
                  fontWeight: orderBy === 'amount' ? 'bold' : 'normal',
                }}
              >
                {row.amount}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: orderBy === 'date' ? '#183168' : '#1e293b',
                  fontWeight: orderBy === 'date' ? 'bold' : 'normal',
                }}
              >
                {row.date}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: orderBy === 'provider_id' ? '#183168' : '#1e293b',
                  fontWeight: orderBy === 'provider_id' ? 'bold' : 'normal',
                }}
              >
                {row.provider_id}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: orderBy === 'employee_type_id' ? '#183168' : '#1e293b',
                  fontWeight: orderBy === 'employee_type_id' ? 'bold' : 'normal',
                }}
              >
                {row.employee_type_id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={data.length}
        page={currentPage}
        onPageChange={(event, newPage) => handlePageChange(event, newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]} // Only allow 10 rows per page
        sx={{
          backgroundColor: '#1e293b', // Pagination background
          color: '#ffffff', // Pagination text
          '& .MuiPaginationItem-root': {
            color: '#ffffff',
          },
        }}
      />
    </TableContainer>
  );
};

export default DataTable;
