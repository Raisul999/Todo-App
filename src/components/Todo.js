import React, { useState } from 'react'
import axios from 'axios';
import { Grid, TextField, MenuItem, Divider, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, Container, Card, CardContent, InputLabel, FormControl } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useAuthUser } from 'react-auth-kit'
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify'
import CloseIcon from "@mui/icons-material/Close";
import 'react-toastify/dist/ReactToastify.css'

const Todo = ({ filter, handleFilter, getTodos }) => {
        const auth = useAuthUser()
        const [deadline, setDeadline] = useState(new Date())
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [priority, setPriority] = useState('')
        const [open, setOpen] = useState(false);


        let today = new Date()

        const addTasks = async (e) => {
                e.preventDefault();
                if (title === '') {
                        toast.error("Please enter a title")
                        return


                } else if (description === '') {
                        toast.error("Please enter a description")
                        return

                } else if (priority === '') {
                        toast.error("Please select a priority")
                        return


                } else if (deadline === '') {
                        toast.error("Please select a deadline")
                        return


                } else if (deadline < today) {
                        toast.error("Please select deadline at least one day above current date")
                        return
                }
                else {
                        console.log("To do data added succesfully");
                        let task = { title, description, priority, deadline }
                        try {
                                const config = {
                                        headers: {
                                                'Authorization': `Bearer ${auth().token} `,
                                                'ngrok-skip-browser-warning': 'any'
                                        }
                                }

                                const res = await axios.post(`${process.env.REACT_APP_API_URL}api/todo`, task, config)

                                handleClose()
                                getTodos()
                        } catch (err) {
                                alert(err.message);
                        }



                }

        }

        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = () => {
                setOpen(false);
        };

        return (
                <>
                        <Container>

                                <Card>
                                        <CardContent>
                                                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }}>
                                                        {<FormControl sx={{
                                                                minWidth: 150,
                                                        }}>
                                                                <InputLabel id="demo-simple-select-label" shrink>Filter Tasks</InputLabel>
                                                                <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        label="Status"
                                                                        value={filter}
                                                                        onChange={handleFilter}
                                                                        sx={{ minWidth: 130 }}
                                                                >

                                                                        <MenuItem value='Ongoing'>Ongoing </MenuItem>
                                                                        <MenuItem value='Completed'>Completed</MenuItem>
                                                                        <MenuItem value='Failed'>Failed</MenuItem>
                                                                        <MenuItem value='All'>All</MenuItem>
                                                                </Select>
                                                        </FormControl>}
                                                        <Button variant="contained" onClick={handleClickOpen} sx={{
                                                                m: 2,

                                                                justifyContent: "flex-end",
                                                                alignItems: "flex-end",
                                                        }}>
                                                                Add Tasks
                                                        </Button>
                                                </div>
                                        </CardContent>
                                </Card>




                                <Dialog open={open} onClose={handleClose} fullWidth disableEscapeKeyDown={true}>
                                        <DialogTitle>Create Task</DialogTitle>
                                        <Divider />
                                        <DialogContent>
                                                <IconButton
                                                        style={{ position: "absolute", top: "0", right: "0" }}
                                                        onClick={() => setOpen(false)}
                                                >
                                                        <CloseIcon />
                                                </IconButton>
                                                <Grid container spacing={3} justifyContent='center' alignItems='space-around' flexDirection='column'>
                                                        <Grid item md={12}>
                                                                <TextField
                                                                        id="outlined-required"
                                                                        label="Task Title"
                                                                        fullWidth
                                                                        variant='outlined'
                                                                        name='title'
                                                                        value={title}
                                                                        onChange={(e) => setTitle(e.target.value)}

                                                                />
                                                        </Grid>
                                                        <Grid item md={12}>
                                                                <TextField
                                                                        id="outlined-required"
                                                                        label="Task Deskcription"
                                                                        fullWidth
                                                                        variant='outlined'
                                                                        multiline
                                                                        maxRows={10}
                                                                        value={description}
                                                                        onChange={(e) => setDescription(e.target.value)}

                                                                />
                                                        </Grid>
                                                        <Grid item md={12}>
                                                                <TextField
                                                                        id="outlined-required"
                                                                        label="Task Priority"
                                                                        fullWidth
                                                                        select
                                                                        variant='outlined'
                                                                        value={priority}
                                                                        onChange={(e) => setPriority(e.target.value)}

                                                                >
                                                                        <MenuItem value='High'>High</MenuItem>
                                                                        <MenuItem value='Medium'>Medium</MenuItem>
                                                                        <MenuItem value='Low'>Low</MenuItem>
                                                                </TextField>
                                                        </Grid>
                                                        <Grid item md={12}>
                                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DesktopDatePicker
                                                                                label="Deadline"
                                                                                inputFormat="MM/DD/YYYY"
                                                                                value={deadline}
                                                                                onChange={(newValue) => setDeadline(newValue)}
                                                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                                                                minDate={deadline}
                                                                        />
                                                                </LocalizationProvider>


                                                        </Grid>

                                                </Grid>
                                        </DialogContent>
                                        <DialogActions>
                                                <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                                                <Button onClick={addTasks} variant="contained" color="primary">Submit</Button>
                                        </DialogActions>
                                </Dialog>
                                <ToastContainer />
                        </Container>
                </>
        )
}

export default Todo
