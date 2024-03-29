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
            await addStep(taskId, subtaskId, description, steps.length +1)
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

    return (
        <>
        <div className="stepContainer">
            <ul>
                {steps.map((step, index) => (
                    <li className="stepWindow" key={index}>
                        <StepCard order={step.order} taskId={taskId} subtaskId={subtaskId} id={step.id} description={step.description} isComplete={step.isComplete} />
                        <button className="deleteButton" onClick={() => handleRemoveStep(step.id)}>❌</button>
                    </li>
                ))}
                <div>
                    <label style={{color: "yellow"}}>new step:</label>
                    <input
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Describe step"
                    onKeyDown={(event) => {event.key === 'Enter' ? submitNewStep() : () => {}}}
                    />
                    <button onClick={submitNewStep}>add step</button>
                </div>
            </ul>
        </div>
        </>
    )
}

export default StepWindow