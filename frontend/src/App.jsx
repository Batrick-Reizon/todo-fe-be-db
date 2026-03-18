import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

function App() {
  const [eactivity, setEactivity] = useState("")
  const [activity, setActivity] = useState([])
  const API = import.meta.env.VITE_APP_API_URL

  useEffect(() => {
    const todolist = axios.get(`${API}/todolist`)
    todolist.then((data) => {
      setActivity(data.data)
    })
  }, [])

  const handleactivity = (event) => {
    setEactivity(event.target.value)
  }
  const handleAdd = () => {
    if (!eactivity.trim()) {
      alert("Please enter any activity to add todolist")
      return
    }
    const addactivity = axios.post(`${API}/addactivity`, { activity: eactivity })
    addactivity.then((res) => {
      setActivity([...activity, res.data])
      setEactivity("")
    })
  }
  const handleDelete = (id) => {
    const newactivity = axios.delete(`${API}/deleteactivity/${id}`)
    newactivity.then(() => {
      setActivity(activity.filter((data) => {
        return (data._id !== id)
      }))
    })
  }

  return (<div className="flex flex-col justify-center items-center h-dvh">
    <div className="bg-gradient-to-tr from-gray-300 to-neutral-700 p-5 shadow-lg rounded w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 text-center">
      <h1 className="text-2xl md:text-3xl font-black">Todo-List</h1>
      <h3 className="my-3 text-base md:text-lg">Please enter any activities to add todo-list</h3>
      <input type="text" value={eactivity} onChange={handleactivity} name="activity" placeholder="Enter any activities" className="border border-black p-1 rounded outline-none " />
      <button onClick={handleAdd} className="ml-3 bg-black text-white p-1 rounded">Add</button>
      {activity.map((item, index) => {
        return (<div key={index} className="border-b border-black flex justify-around items-center my-5">
          <h1 className="text-base md:text-lg font-semibold m-3">{index + 1}. {item.name}</h1>
          <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
        </div>
        )
      })}
    </div>
  </div>)
}

export default App