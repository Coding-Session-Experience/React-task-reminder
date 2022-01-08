// import logo from './logo.svg';
// import './App.css';

import React, {useState} from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks"
import {object} from "prop-types";


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

    const [tasks, setTasks] = useState(
        [
            {
                id: 1,
                text: 'Doctors Appointment',
                day: 'Feb 5th at 2:30 p.m',
                reminder: true
            },
            {
                id: 2,
                text: 'Meeting At School',
                day: 'Feb 6th at 2:30 p.m',
                reminder: true
            },
            {
                id: 3,
                text: 'Food Shopping',
                day: 'Feb 7th at 2:30 p.m',
                reminder: false
            }
        ])

    //delete task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        console.log(id);
        setTasks(tasks.map((task) =>
            task.id === id ? {...task,
                reminder : !task.reminder} : task))
    }

    return (
        <div className="container">
            <Header/>
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                : 'No Tasks to show'}
        </div>
    )
}

export default App;
