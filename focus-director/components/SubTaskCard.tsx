"use client";

import '../styles/styles.scss'
import StepWindow from './StepWindow'
import { useState, useContext } from 'react'
import { Subtask } from './TaskTypes'
import { updateSubtaskStatus, updateSubtaskDescription } from './API_methods';
import TaskDataProvider from './TaskDataContext'

const SubtaskCard: React.FC<Subtask> = ({taskId, id, description, isComplete, steps, order}) => {
    const { getTasks } = useContext(TaskDataProvider)!
    const [focused, setFocused] = useState(false)
    const [showSteps, setShowSteps] = useState(false)
    const [newDescription, setNewDescription] = useState(description)

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
        return renderButton()
    }

    const renderButton = () => {
        if (!showSteps && steps) {
            return (
                <button onClick={() => toggleSteps()}>Show steps: {steps.length}</button>
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

    const handleDescriptionUpdate = async () => {
        if (newDescription !== description) {
            await updateSubtaskDescription(taskId, id, newDescription)
            getTasks()
        }
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
                <div className="cardDescription">
                    <div style={{display: "flex"}}>
                        <p style={{paddingRight: "4px", color: "yellowgreen"}}>{`${order}.`}</p>    
                        <p
                        contentEditable="true"
                        suppressContentEditableWarning
                        spellCheck="false"
                        onInput={(event) => {setNewDescription(event.currentTarget.innerText)}}
                        onKeyDown={(event) => {event.key === 'Enter' ? event.currentTarget.blur() : () => {}}}
                        onBlur={handleDescriptionUpdate}
                        style={isComplete ? {textDecoration: 'line-through'} : {textDecoration: 'none'}} 
                        >
                            {description}
                        </p>                    
                    </div>
                    <input 
                    type="checkbox"
                    checked={isComplete} 
                    onChange={() => handleUpdateSubtaskStatus(!isComplete)} 
                    style={{width: "20px", height: "20px"}}
                    />
                </div>                   
                {renderSubtasks()}
            </div>
        </>
    )
}

export default SubtaskCard