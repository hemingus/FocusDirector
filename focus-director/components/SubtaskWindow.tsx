"use client";

import SubtaskCard from './SubtaskCard'
import '../styles/styles.scss'
import { useState, useContext } from 'react'
import { Subtask } from './TaskTypes'
import { addSubtask, deleteSubtask } from './API_methods'
import TaskDataContext from './TaskDataContext'

const SubtaskWindow: React.FC<{ taskId: string, subtasks: Subtask[] }> = ({taskId, subtasks}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [description, setDescription] = useState<string>('')

    const submitNewSubtask = async () => {
        if (description.trim() !== '') {
            await addSubtask(taskId, description, subtasks.length+1)
            getTasks()
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveSubtask = async (subtaskId: string) => {
        await deleteSubtask(taskId, subtaskId)
        getTasks()
    }

    return (
        <div className="subtaskContainer">
            <ul>
                {subtasks.map((subtask, index) => (
                    <li className="subtaskWindow" key={index}>
                        <SubtaskCard order={subtask.order} taskId={taskId} id={subtask.id} description={subtask.description} isComplete={subtask.isComplete} steps={subtask.steps}/>
                        <button className="deleteButton" onClick={() => handleRemoveSubtask(subtask.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <div>
                <label style={{color: "yellowgreen"}}>new subtask:</label>
                <input
                type="text"
                value={description}
                onChange={handleChange}
                placeholder="Describe subtask"
                onKeyDown={(event) => {event.key === 'Enter' ? submitNewSubtask() : () => {}}}
                />
                <button onClick={submitNewSubtask}>add subtask</button>
            </div>
        </div>
    )
}

export default SubtaskWindow