"use client";

import '../styles/styles.scss'
import TaskWindow from './TaskWindow'
import SubTaskWindow from './SubTaskWindow';
import { useState } from 'react'
import { Task } from './TaskTypes'

const TaskCard: React.FC<Task> = ({description, isComplete, subTasks}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)
    const [showSubtasks, setShowSubtasks] = useState(false)

    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
        console.log(showSubtasks)
        console.log(subTasks)
    }

    const renderSubtasks = () => {
        if (showSubtasks && subTasks && subTasks.length > 0) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide</button>
                <SubTaskWindow subTasks={subTasks} />  
            </div>
            )
        }
        return renderButton();
    }

    const renderButton = () => {
        if (!showSubtasks && subTasks && subTasks.length > 0) {
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

export default TaskCard