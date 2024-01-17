"use client";

import SubtaskCard from './SubtaskCard'
import '../styles/styles.scss'
import { useState, useEffect, useContext } from 'react'
import { Subtask } from './TaskTypes'
import { addSubtask, deleteSubtask } from './API_methods'
import TaskDataContext from './TaskDataContext'



const SubtaskWindow: React.FC<{ taskId: string, subtasks: Subtask[] }> = ({taskId, subtasks}) => {
    const { getTasks } = useContext(TaskDataContext)!
    // const [subtaskList, setSubtaskList] = useState<Subtask[]>(subtasks)
    const [description, setDescription] = useState<string>('')

    const submitNewSubtask = async () => {
        if (description.trim() !== '') {
            await addSubtask(taskId, description)
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

    const cardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="subtaskContainer">
            <ul>
                {subtasks.map((subtask, index) => (
                    <li className="subtaskWindow" key={index}>
                        <SubtaskCard taskId={taskId} id={subtask.id} description={cardContent(index, subtask.description)} isComplete={subtask.isComplete} steps={subtask.steps}/>
                        <button onClick={() => handleRemoveSubtask(subtask.id)}>❌</button>
                    </li>
                ))}
                <div>
                    <label>new subtask:</label>
                    <input
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Describe subtask"
                    />
                    <button onClick={submitNewSubtask}>add subtask</button>
                </div>
            </ul>
        </div>

        </>
    )
}

export default SubtaskWindow