"use client";

import '../styles/styles.scss'
import StepWindow from './StepWindow'
import { useState } from 'react'
import { Subtask } from './TaskTypes'

const SubtaskCard: React.FC<Subtask> = ({description, isComplete, steps}) => {
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
                <StepWindow steps={steps} />  
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
            <div className="subTaskCard">
                <p>{description}</p>
                {renderSubtasks()}
            </div>
            
        </>
    )
}

export default SubtaskCard