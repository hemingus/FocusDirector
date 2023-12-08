"use client";

import SubTaskCard from './SubTaskCard'
import '../styles/styles.scss'
import { useState } from 'react'
import { SubTask } from './TaskTypes'



const SubTaskWindow: React.FC<{ subTasks: SubTask[] }> = ({subTasks}) => {
    const [listed, setListed] = useState<SubTask[]>(subTasks)
    const [description, setDescription] = useState<string>('')

    const submitNewTask = () => {
        if (description.trim() !== '') {
            let newSubTask: SubTask = {description: description, isComplete: false, steps: []}
            setListed([...listed, newSubTask])
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
                {listed.map((subTask, index) => (
                    <li key={index}>
                        <SubTaskCard description={taskCardContent(index, subTask.description)} isComplete={subTask.isComplete} steps={subTask.steps}/>
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

export default SubTaskWindow