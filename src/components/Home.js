import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import Todos from './Todos'
import { Typography, CircularProgress } from '@mui/material'
import { useAuthUser } from 'react-auth-kit'
import { Grid } from '@mui/material'
import axios from 'axios'
const Home = () => {

  const auth = useAuthUser()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(false)

  // console.log(auth().token)
  useEffect(() => {
    getTodos()

  }, [])

  const handleFilter = (e) => {
    setFilter(e.target.value)

  }

  const getTodos = async () => {

    const config = {
      headers: {
        'Authorization': `Bearer ${auth().token} `,
        'ngrok-skip-browser-warning': 'any'
      }
    }
    setLoading(true)

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/todo`, config)
      // console.log(res.data)
      setTasks(res.data)
      setLoading(false)
    } catch (err) {
      alert('Error: ' + err.message)
    }


  }

  const ongoing = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) > new Date())))

  const completed = tasks.filter((val) => val.isComplete == true)

  const failed = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) < new Date())))

  // console.log('Ongoing', ongoing)
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <Typography variant='h4' sx={{ margin: '2rem' }}>
          Welcome to Dashbaord {auth().name}
        </Typography>

      </div>
      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Todo
          filter={filter}
          handleFilter={handleFilter}
          getTodos={getTodos}
          tasks={tasks}
        />
      </Grid>
      <br /><br />
      {
        loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div> :
          <div>
            {tasks && tasks.length > 0 && <div style={{ margin: '0 1rem' }}>

              {filter === 'All' && tasks.map((task, i) =>
                <Todos
                  key={task._id}
                  task={task}
                  getTodos={getTodos}
                />
              )}
              {filter === 'Ongoing' && ongoing.map((task, i) =>
                <Todos
                  key={task._id}
                  task={task}
                  getTodos={getTodos}
                />
              )}
              {filter === 'Completed' && completed.map((task, i) =>
                <Todos
                  key={task._id}
                  task={task}
                  getTodos={getTodos}
                />
              )}
               {filter === 'Failed' && failed.map((task, i) =>
                <Todos
                  key={task._id}
                  task={task}
                  getTodos={getTodos}
                />
              )}
            </div>}
          </div>
      }
      {
        (loading == false && tasks.length == 0) && <div style={{ margin: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h5'>
            No Posts Available
          </Typography>
        </div>
      }
    </>
  )
}

export default Home;