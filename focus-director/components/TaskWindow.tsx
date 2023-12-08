"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState } from 'react'
import { Task, SubTask, Step } from './TaskTypes'



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
        const updatedList = [...listed]
        updatedList.splice(index, 1)
        setListed(updatedList)
    }

    const taskCardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="taskContainer">
            <ul>
                {listed.map((task, index) => (
                    <li key={index}>
                        <TaskCard description={taskCardContent(index, task.description)} isComplete={task.isComplete} subTasks={task.subTasks}/>
                        <button onClick={() => handleRemoveTask(index)}>❌</button>
                    </li>
                ))}
                <div>
                    <label>Create new step</label>
                    <input
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Describe step"
                    />
                    <button onClick={submitNewTask}>Add Step</button>
                </div>
            </ul>
        </div>

        </>
    )
}

export default TaskWindow