"use client";

import '../styles/styles.scss'
import StepWindow from './StepWindow'
import { useState } from 'react'
import { Subtask } from './TaskTypes'
import { updateSubtaskStatus } from './API_methods';

const SubtaskCard: React.FC<Subtask> = ({taskId, id, description, isComplete, steps}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)
    const [showSubtasks, setShowSubtasks] = useState(false)

    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
    }

    const renderSubtasks = () => {
        if (showSubtasks && steps) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide steps</button>
                <StepWindow taskId={taskId} subtaskId={id} steps={steps} />  
            </div>
            )
        }
        return renderButton();
    }

    const renderButton = () => {
        if (!showSubtasks && steps) {
            return (
                <button onClick={() => toggleSubtasks()}>Show steps</button>
            )
        }
        return (
            <div>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        )
    }

    const handleUpdateSubtaskStatus = async (id: string, status: boolean) => {
        await updateSubtaskStatus(taskId, id, status)
        setCompleted(status)
        setShowSubtasks(!status)
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
            <div className={completed ? "taskCardCompleted" : "subtaskCard"}>
                <p style={completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{description}</p>
                <button onClick={() => {handleUpdateSubtaskStatus(id, !completed)}}>{statusText()}</button>
                {renderSubtasks()}
            </div>
        </>
    )
}

export default SubtaskCard