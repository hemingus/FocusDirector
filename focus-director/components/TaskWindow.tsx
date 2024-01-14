"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState, useEffect } from 'react'
import { Task } from './TaskTypes'
import {deleteTask, addTask} from './API_methods'


const TaskWindow: React.FC = () => {
    const [tasks, setTasks] = useState<Array<any>>([])
    const [taskDescription, setTaskDescription] = useState<string>('')

    const getTasks = async (url = "https://hemingmusicapi.azurewebsites.net/TaskEntity") => {
        await fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTasks(data)
        })
        .catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    const submitNewTask = () => {
        if (taskDescription.trim() !== '') {
            addTask(taskDescription)
            .then((response) => {
                console.log(response);
                getTasks();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(event.target.value);
    }

    const handleRemoveTask = async (taskId: string) => {
        await deleteTask(taskId)
        await getTasks();
    }

    const indexedDescription = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 


    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'rgb(0, 80, 80)'}}>
            <ul>
                {tasks.map((task, index) => (
                    <li className="taskWindow" key={index}>
                        <TaskCard id={task.id} description={indexedDescription(index, task.description)} isComplete={task.isComplete} subtasks={task.subtasks}/>
                        <button onClick={() => handleRemoveTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <label style={{color: "darkred"}}>New task:</label>
            <input
            type="text"
            value={taskDescription}
            onChange={handleChange}
            placeholder="Describe task"
            />
            <button onClick={submitNewTask}>Add task</button>
        </div>

        </>
    )
}

export default TaskWindow