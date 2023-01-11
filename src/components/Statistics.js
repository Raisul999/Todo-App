import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthUser } from 'react-auth-kit'
import PieChart from './PieChart'
import TaskTable from './TaskTable'
import moment from 'moment'

const Statistics = () => {

  const auth = useAuthUser()
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    getTodos()

  }, [])

  const getTodos = async () => {

    const config = {
      headers: {
        'Authorization': `Bearer ${auth().token} `,
        'ngrok-skip-browser-warning': 'any'
      }
    }


    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/todo`, config)
      // console.log(res.data)
      setTasks(res.data)
    } catch (err) {
      alert('Error: ' + err.message)
    }


  }

  const ongoing = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) > new Date()))).length

  const completed = tasks.filter((val) => val.isComplete == true).length

  const failed = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) < new Date()))).length


  const handleSearch = (query) => {

    if (query) {
      const filtered = tasks.filter(
        task =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase()) ||
          task.priority.toLowerCase().includes(query.toLowerCase()) ||
          moment(task.deadline).format('DD-MM-YYYY').includes(query)
      );

      return filtered

    }
    return tasks
  }

  const handleQuery = (e) => {
    setQuery(e.target.value)
  }

  let ongPercentage = Math.floor((ongoing / tasks.length) * 100)
  let comPercentage = Math.floor((completed / tasks.length) * 100)
  let failPercentage = Math.floor((failed / tasks.length) * 100)


  const data = {
    labels: [`Ongoing:${ongPercentage}%`, `Completed:${comPercentage}%`, `Failed:${failPercentage}%`],
    datasets: [
      {
        label: 'no. of tasks',
        data: [ongoing, completed, failed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }



  return (
    <div>
      <PieChart
        data={data}
      />
      <TaskTable
        query={query}
        tasks={tasks}
        handleSearch={handleSearch}
        handleQuery={handleQuery}
      />
    </div>
  )
}

export default Statistics
