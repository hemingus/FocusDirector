"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState } from 'react'
import { Task } from './TaskTypes'



const TaskWindow: React.FC<{ tasks: Task[] }> = ({tasks}) => {
    const [listed, setListed] = useState<Task[]>(tasks)
    const [description, setDescription] = useState<string>('')

    const submitNewTask = () => {
        if (description.trim() !== '') {
            let newTask: Task = {description: description, isComplete: false, subTasks: []}
            setListed([...listed, newTask])
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveTask = (index: number) => {
        const updatedList = listed.filter((_, i) => i !== index);
        setListed(updatedList)
    }

    const indexedDescription = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 


    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'darkred'}}>
            <ul>
                {listed.map((task, index) => (
                    <li key={index}>
                        <TaskCard description={indexedDescription(index, task.description)} isComplete={task.isComplete} subTasks={task.subTasks}/>
                        <button onClick={() => handleRemoveTask(index)}>❌</button>
                    </li>
                ))}
            </ul>
            <label style={{color: "darkred"}}>New task:</label>
            <input
            type="text"
            value={description}
            onChange={handleChange}
            placeholder="Describe task"
            />
            <button onClick={submitNewTask}>Add task</button>
        </div>

        </>
    )
}

export default TaskWindow