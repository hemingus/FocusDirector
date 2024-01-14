"use client";

import StepCard from './StepCard'
import '../styles/styles.scss'
import { useState } from 'react'
import { Step } from './TaskTypes'
import { addStep, deleteStep } from './API_methods'

const StepWindow: React.FC<{ taskId: string, subtaskId: string, steps: Step[] }> = ({taskId, subtaskId, steps}) => {
    const [stepList, setStepList] = useState<Step[]>(steps)
    const [description, setDescription] = useState<string>('')

    const getSteps = async () => {
        try {
            await fetch(`https://hemingmusicapi.azurewebsites.net/taskentity/${taskId}/subtask/${subtaskId}/step`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setStepList(data))
            .catch(err => {
                console.error(err)
            })
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    const submitNewStep = async () => {
        if (description.trim() !== '') {
            await addStep(taskId, subtaskId, description)
            await getSteps()
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleRemoveStep = async (stepId: string) => {
        await deleteStep(taskId, subtaskId, stepId)
        await getSteps()
    }

    const cardContent = (index: number, description: string) => {
        let content = `${index + 1}. ${description}`
        return content
    } 

    return (
        <>
        <div className="taskContainer" style={{border: 'solid', borderColor: 'rgb(0, 120, 40)'}}>
            <ul>
                {stepList.map((step, index) => (
                    <li className="stepWindow" key={index}>
                        <StepCard taskId={taskId} subtaskId={subtaskId} id={step.id} description={cardContent(index, step.description)} isComplete={step.isComplete} />
                        <button onClick={() => handleRemoveStep(step.id)}>❌</button>
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
                    <button onClick={submitNewStep}>Add Step</button>
                </div>
            </ul>
        </div>

        </>
    )
}

export default StepWindow