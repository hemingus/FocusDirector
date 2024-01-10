"use client";

import SubTaskCard from './SubTaskCard'
import '../styles/styles.scss'
import { useState, useEffect } from 'react'
import { Subtask } from './TaskTypes'
import { addSubtask, deleteSubtask } from './API_methods'



const SubTaskWindow: React.FC<{ taskId: string, subTasks: Subtask[] }> = ({taskId, subTasks}) => {
    const [listed, setListed] = useState<Subtask[]>(subTasks)
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        setListed(subTasks)
    }, [subTasks])

    const getSubtasks = async () => {
        try {
            await fetch(`https://hemingmusicapi.azurewebsites.net/taskentity/${taskId}/subtask`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setListed(data))
            .catch(err => {
                console.error(err)
            })
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    const submitNewTask = async () => {
        if (description.trim() !== '') {
            await addSubtask(taskId, description)
            await getSubtasks()
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveTask = async (subtaskId: string) => {
        console.log(listed)
        console.log(`taskId: ${taskId} subtaskId: ${subtaskId}`)
        await deleteSubtask(taskId, subtaskId)
        await getSubtasks()
    }

    const taskCardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'darkorange'}}>
            <ul>
                {listed.map((subTask, index) => (
                    <li key={index}>
                        <SubTaskCard id={subTask.id} description={taskCardContent(index, subTask.description)} isComplete={subTask.isComplete} steps={subTask.steps}/>
                        <button onClick={() => handleRemoveTask(subTask.id)}>❌</button>
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
                    <button onClick={submitNewTask}>Add subtask</button>
                </div>
            </ul>
        </div>

        </>
    )
}

export default SubTaskWindow