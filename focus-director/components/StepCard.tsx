"use client";

import '../styles/styles.scss'
import { useState } from 'react'
import { Step } from './TaskTypes'
import { updateStepStatus } from './API_methods';

const StepCard: React.FC<Step> = ({taskId, subtaskId, id, description, isComplete}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)

    const handleUpdateStepStatus = async (id: string, status: boolean) => {
        await updateStepStatus(taskId, subtaskId, id, status)
        setCompleted(status)
    } 

    const statusText= () => {
        if (!completed) {
            return "Complete"
        }
        return "Revive"
    }

    if (focused) {
        return (
            <div className="taskCardFocused" onClick={() => setFocused(false)}>
                <p>{description}</p>
                <button>Done ☑ -~⍟~- Next ➠</button>
            </div>
        )
    }
    return (
        <>
            <div className={completed ? "taskCardCompleted" : "stepCard"}>
                <p style={completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{description}</p>
                <button onClick={() => handleUpdateStepStatus(id, !completed)}>{statusText()}</button>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        </>
    )
}

export default StepCard