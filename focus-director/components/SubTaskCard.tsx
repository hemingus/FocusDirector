"use client";

import '../styles/styles.scss'
import StepWindow from './StepWindow'
import { useState } from 'react'
import { SubTask } from './TaskTypes'

const SubTaskCard: React.FC<SubTask> = ({description, isComplete, steps}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)
    const [showSubtasks, setShowSubtasks] = useState(false)

    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
        console.log(showSubtasks)
        console.log(steps)
    }

    const renderSubtasks = () => {
        if (showSubtasks && steps && steps.length > 0) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide</button>
                <StepWindow steps={steps} />  
            </div>
            )
        }
        return renderButton();
    }

    const renderButton = () => {
        if (!showSubtasks && steps && steps.length > 0) {
            return (
                <button onClick={() => toggleSubtasks()}>Expand</button>
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
            <div className="taskCard">
                <p>{description}</p>
            </div>
            {renderSubtasks()}
        </>
    )
}

export default SubTaskCard