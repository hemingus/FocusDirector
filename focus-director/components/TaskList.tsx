"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState } from 'react'

type TaskListProps = {
    tasks: string[]
}

const TaskList: React.FC<TaskListProps> = ({tasks}) => {
    const [listed, setListed] = useState<string[]>(tasks)
    const [description, setDescription] = useState<string>('')

    const submitNewTask = () => {
        if (description.trim() !== '') {
            setListed([...listed, description])
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

    return (
        <>
        <div className="taskContainer">
            <ul>
                {listed.map((task, index) => (
                    <li key={index}>
                        <TaskCard description={task} />
                        <button onClick={() => handleRemoveTask(index)}>Remove</button>
                    </li>
                ))}
                <div>
                    <label>Create new step</label>
                    <input
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Describe step"
                    >
                    </input>
                    <button onClick={submitNewTask}>Add Step</button>
                </div>
            </ul>
        </div>

        </>
    )
}

export default TaskList