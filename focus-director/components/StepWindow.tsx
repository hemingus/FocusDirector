"use client";

import StepCard from './StepCard'
import '../styles/styles.scss'
import { useState } from 'react'
import { Step } from './TaskTypes'

const StepWindow: React.FC<{ steps: Step[] }> = ({steps}) => {
    const [stepList, setStepList] = useState<Step[]>(steps)
    const [description, setDescription] = useState<string>('')

    const submitNewTask = () => {
        if (description.trim() !== '') {
            let newStep: Step = {description: description, isComplete: false}
            setStepList([...stepList, newStep])
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveTask = (index: number) => {
        const updatedList = [...stepList]
        updatedList.splice(index, 1)
        setStepList(updatedList)
    }

    const cardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'yellow', backgroundImage: 'linear-gradient(to right, #ff0000, #0000ff)'}}>
            <ul>
                {stepList.map((step, index) => (
                    <li key={index}>
                        <StepCard description={cardContent(index, step.description)} isComplete={step.isComplete} />
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