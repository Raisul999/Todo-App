import { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Chip } from '@mui/material';
import moment from 'moment/moment';
import { CSVLink } from "react-csv";

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
  {
    id: 'priority',
    label: 'Priority',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'deadline',
    label: 'Deadline',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'complete',
    label: 'Complete',
    minWidth: 170,
    align: 'right',

  },
];





const TaskTable = ({ tasks, handleSearch, query, handleQuery }) => {

  // console.log(tasks)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div>
        <Button variant='contained' style={{ float: 'right', margin: '2rem 3rem 2rem 2rem' }}>
          <CSVLink
            style={{ textDecoration: 'none', color: 'inherit' }}
            data={tasks}
            filename={"tasks.csv"}
          >
            Export to CSV
          </CSVLink>
        </Button>
      </div>
      <Paper style={{ margin: '5rem 3rem' }}>
        <TextField
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleQuery}
          style={{ padding: '2rem'}}

        />
        <TableContainer style={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Complete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch(query)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, i) => {
                  return (
                    <TableRow
                      key={task._id}
                    >
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{(task.priority=='High'&&<Chip label={task.priority} color="error" variant="info" />)||
                      (task.priority=='Medium'&&<Chip label={task.priority} color="warning" variant="filled" />)||
                      (task.priority=='Low'&&<Chip label={task.priority} color="primary" variant="filled" />)
                      
                      }</TableCell>
                      <TableCell>{moment(task.deadline).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{task.isComplete == false ?  <Chip label="No" color="error" variant="filled" /> :  <Chip label="Yes" color="success" variant="filled" />}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>

  );
}

export default TaskTable;
