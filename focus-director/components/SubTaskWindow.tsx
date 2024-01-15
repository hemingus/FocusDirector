"use client";

import SubtaskCard from './SubtaskCard'
import '../styles/styles.scss'
import { useState, useEffect } from 'react'
import { Subtask } from './TaskTypes'
import { addSubtask, deleteSubtask } from './API_methods'



const SubtaskWindow: React.FC<{ taskId: string, subtasks: Subtask[] }> = ({taskId, subtasks}) => {
    const [subtaskList, setSubtaskList] = useState<Subtask[]>(subtasks)
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        getSubtasks()
    }, [])

    const getSubtasks = async () => {
        try {
            await fetch(`https://hemingmusicapi.azurewebsites.net/taskentity/${taskId}/subtask`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setSubtaskList(data))
            .catch(err => {
                console.error(err)
            })
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    const submitNewSubtask = async () => {
        if (description.trim() !== '') {
            await addSubtask(taskId, description)
            await getSubtasks()
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveSubtask = async (subtaskId: string) => {
        console.log(subtaskList)
        console.log(`taskId: ${taskId} subtaskId: ${subtaskId}`)
        await deleteSubtask(taskId, subtaskId)
        await getSubtasks()
    }

    const cardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'rgb(80, 150, 100)'}}>
            <ul>
                {subtaskList.map((subtask, index) => (
                    <li className="subtaskWindow" key={index}>
                        <SubtaskCard taskId={taskId} id={subtask.id} description={cardContent(index, subtask.description)} isComplete={subtask.isComplete} steps={subtask.steps}/>
                        <button onClick={() => handleRemoveSubtask(subtask.id)}>❌</button>
                    </li>
                ))}
                <div>
                    <label>New subtask:</label>
                    <input
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Describe subtask"
                    />
                    <button onClick={submitNewSubtask}>Add subtask</button>
                </div>
            </ul>
        </div>

        </>
    )
}

export default SubtaskWindow