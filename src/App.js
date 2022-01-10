// import logo from './logo.svg';
// import './App.css';

import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import task from "./components/Task";
// import {object} from "prop-types";


// function App() {
//   return (
//     <div className="Container">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}

//       <h1>hello From reacts</h1>
//       <h1>hello</h1>
//     </div>
//   );
// } 

const App = () => {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    //Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5500/tasks')
        const data = await res.json()
        // console.log(data);
        return data;
    }

    //Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5500/tasks/${id}`)
        const data = await res.json()
        // console.log(data);
        return data;
    }

    //add task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5500/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        setTasks([...tasks, data])

        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])
    }

    //delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5500/tasks/${id}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //toggle reminder
    const toggleReminder = async (id) => {
        const  taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5500/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()

        console.log(id);
        setTasks(tasks.map((task) =>
            task.id === id ? {
                ...task,
                reminder: data.reminder
            } : task))
    }

    return (
        <div className="container">
            <Header onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                : 'No Tasks to show'}
        </div>
    )
}

export default App;
