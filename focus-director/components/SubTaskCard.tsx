"use client";

import '../styles/styles.scss'
import StepWindow from './StepWindow'
import { useState, useContext } from 'react'
import { Subtask } from './TaskTypes'
import { updateSubtaskStatus } from './API_methods';
import TaskDataProvider from './TaskDataContext'

const SubtaskCard: React.FC<Subtask> = ({taskId, id, description, isComplete, steps}) => {
    const { getTasks } = useContext(TaskDataProvider)!
    const [focused, setFocused] = useState(false)
    const [showSteps, setShowSteps] = useState(false)

    const toggleSteps = () => {
        setShowSteps(!showSteps)
    }

    const renderSubtasks = () => {
        if (showSteps && steps) {
            return (
            <div>
                <button onClick={() => toggleSteps()}>Hide steps</button>
                <StepWindow taskId={taskId} subtaskId={id} steps={steps} />  
            </div>
            )
        }
        return renderButton();
    }

    const renderButton = () => {
        if (!showSteps && steps) {
            return (
                <button onClick={() => toggleSteps()}>Show steps</button>
            )
        }
        return (
            <div>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        )
    }

    const handleUpdateSubtaskStatus = async (status: boolean) => {
        await updateSubtaskStatus(taskId, id, status)
        getTasks()
        setShowSteps(!status)
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
            <div className={isComplete ? "taskCardCompleted" : "subtaskCard"}>
                <p style={isComplete ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{description}</p>
                <button onClick={() => {handleUpdateSubtaskStatus(!isComplete)}}>{statusText()}</button>
                {renderSubtasks()}
            </div>
        </>
    )
}

export default SubtaskCard