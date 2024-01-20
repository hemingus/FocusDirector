"use client";

import '../styles/styles.scss'
import { useState, useContext } from 'react'
import { Step } from './TaskTypes'
import { updateStepStatus, updateStepDescription } from './API_methods'
import TaskDataContext from './TaskDataContext'

const StepCard: React.FC<Step> = ({taskId, subtaskId, id, description, isComplete, order}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [focused, setFocused] = useState(false)

    const [newDescription, setNewDescription] = useState(description)

    const handleUpdateStepStatus = async (status: boolean) => {
        await updateStepStatus(taskId, subtaskId, id, status)
        getTasks()
    } 

    const handleDescriptionUpdate = async () => {
        if (newDescription !== description) {
            await updateStepDescription(taskId, subtaskId, id, newDescription)
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
            <div className={isComplete ? "taskCardCompleted" : "stepCard"}>
                <div className="cardDescription">
                    <div style={{display: "flex"}}>
                        <span style={{paddingRight: "4px", color: "yellow"}}>{`${order}.`}</span>     
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
                    onChange={() => handleUpdateStepStatus(!isComplete)}
                    className="customCheckbox"
                    checkbox-tooltip={isComplete ? "uncheck" : "Done☑"}
                    />
                </div>
                {/* <button onClick={() => setFocused(true)}>Focus</button> */}
            </div>
        </>
    )
}

export default StepCard