"use client";

import StepCard from './StepCard'
import { useState, useContext } from 'react'
import { Step } from './TaskTypes'
import { addStep } from './API_methods'
import TaskDataContext from './TaskDataContext'
import AddIcon from '../app/assets/icons/add.svg'

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

    return (
        <>
        <div className="stepContainer">
            <ul>
                {steps.map((step, index) => (
                    <li className="stepWindow" key={index}>
                        <StepCard order={step.order} taskId={taskId} subtaskId={subtaskId} id={step.id} description={step.description} isComplete={step.isComplete} />
                    </li>
                ))}
            </ul>
            <div className="inputRowStep">
                <input
                type="text"
                value={description}
                onChange={handleChange}
                placeholder="Describe step"
                onKeyDown={(event) => {event.key === 'Enter' ? submitNewStep() : () => {}}}
                />
                <button onClick={submitNewStep}><AddIcon className="addIcon"/>Add</button>
            </div>
        </div>
        </>
    )
}

export default StepWindow