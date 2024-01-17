"use client";

import '../styles/styles.scss'
import { useState, useContext } from 'react'
import { Step } from './TaskTypes'
import { updateStepStatus } from './API_methods'
import TaskDataContext from './TaskDataContext'

const StepCard: React.FC<Step> = ({taskId, subtaskId, id, description, isComplete}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [focused, setFocused] = useState(false)

    const handleUpdateStepStatus = async (status: boolean) => {
        await updateStepStatus(taskId, subtaskId, id, status)
        getTasks()
    } 

    const statusText= () => {
        if (isComplete) {
            return "Revive"
        }
        return "Complete"
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
            <div className={isComplete ? "taskCardCompleted" : "stepCard"}>
                <p style={isComplete ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{description}</p>
                <button onClick={() => handleUpdateStepStatus(!isComplete)}>{statusText()}</button>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        </>
    )
}

export default StepCard