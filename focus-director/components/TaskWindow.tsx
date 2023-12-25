"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState, useEffect } from 'react'
import { Task } from './TaskTypes'



const TaskWindow: React.FC = () => {
    const [tasks, setTasks] = useState<Array<any>>([])
    const [taskDescription, setTaskDescription] = useState<string>('')

    const getTasks = async (url = "https://hemingmusicapi.azurewebsites.net/TaskEntity") => {
        try {
            await fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setTasks(data)
                console.log(data)})
            .catch(error => {
                console.error(error)
            })
            
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    const addTask = async (url: string) => {
        const newTask = {
            description: taskDescription
        }
        try {
            await fetch(url, {
                method: 'POST', 
                headers: {
                "Content-Type": "application/json"
                }, 
                body: JSON.stringify(newTask)
            })
            getTasks()
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    const deleteTask = async (url: string) => {
        try {
            await fetch(url, {
                method: 'DELETE' 
            })
            getTasks()
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    const submitNewTask = () => {
        if (taskDescription.trim() !== '') {
            addTask("https://hemingmusicapi.azurewebsites.net/TaskEntity")
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(event.target.value);
    }

    const handleRemoveTask = (taskId: string) => {
        deleteTask(`https://hemingmusicapi.azurewebsites.net/TaskEntity/${taskId}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    const indexedDescription = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 


    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'darkred'}}>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <TaskCard description={indexedDescription(index, task.description)} isComplete={task.isComplete} subTasks={task.subTasks}/>
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