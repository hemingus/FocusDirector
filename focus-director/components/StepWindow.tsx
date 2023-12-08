"use client";

import StepCard from './StepCard'
import '../styles/styles.scss'
import { useState } from 'react'
import { Step } from './TaskTypes'



const StepWindow: React.FC<{ steps: Step[] }> = ({steps}) => {
    const [listed, setListed] = useState<Step[]>(steps)
    const [description, setDescription] = useState<string>('')

    const submitNewTask = () => {
        if (description.trim() !== '') {
            let newStep: Step = {description: description, isComplete: false}
            setListed([...listed, newStep])
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
                        <StepCard description={taskCardContent(index, task.description)} isComplete={task.isComplete} />
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

export default StepWindow