"use client";

import StepCard from './StepCard'
import '../styles/styles.scss'
import { useState, useContext } from 'react'
import { Step } from './TaskTypes'
import { addStep, deleteStep } from './API_methods'
import TaskDataContext from './TaskDataContext'

const StepWindow: React.FC<{ taskId: string, subtaskId: string, steps: Step[] }> = ({taskId, subtaskId, steps}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [description, setDescription] = useState<string>('')

    const submitNewStep = async () => {
        if (description.trim() !== '') {
            await addStep(taskId, subtaskId, description)
            getTasks()
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveStep = async (stepId: string) => {
        await deleteStep(taskId, subtaskId, stepId)
        getTasks()
    }

    const cardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="stepContainer">
            <ul>
                {steps.map((step, index) => (
                    <li className="stepWindow" key={index}>
                        <StepCard taskId={taskId} subtaskId={subtaskId} id={step.id} description={cardContent(index, step.description)} isComplete={step.isComplete} />
                        <button onClick={() => handleRemoveStep(step.id)}>❌</button>
                    </li>
                ))}
                <div>
                    <label>new step</label>
                    <input
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Describe step"
                    />
                    <button onClick={submitNewStep}>add step</button>
                </div>
            </ul>
        </div>
        </>
    )
}

export default StepWindow