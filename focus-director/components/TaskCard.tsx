"use client";

import '../styles/styles.scss'
import SubtaskWindow from './SubtaskWindow'
import { useState, useContext } from 'react'
import { Task } from './TaskTypes'
import { updateTaskStatus, updateTaskDescription } from './API_methods'
import TaskDataContext from './TaskDataContext'

const TaskCard: React.FC<Task> = ({id, description, isComplete, subtasks, order}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [focused, setFocused] = useState(false)
    const [showSubtasks, setShowSubtasks] = useState(false)
    const [newDescription, setNewDescription] = useState(description)

    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
    }

    const renderSubtasks = () => {
        if (showSubtasks && subtasks) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide subtasks</button>
                <SubtaskWindow taskId={id} subtasks={subtasks} />  
            </div>
            )
        }
        return renderButton();
    }

    const handleUpdateTaskStatus = async (status: boolean) => {
        await updateTaskStatus(id, status)
        getTasks()
        setShowSubtasks(!status)
    } 

    const renderButton = () => {
        if (!showSubtasks && subtasks) {
            return (
                <button onClick={() => toggleSubtasks()}>Show subtasks: {subtasks.length}</button>
            )
        }
        return (
            <div>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        )
    }

    const handleDescriptionUpdate = async () => {
        console.log(description)
        console.log(newDescription)
        if (newDescription !== description) {
            await updateTaskDescription(id, newDescription)
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
            <div className={isComplete ? "taskCardCompleted" : "taskCard"}>
                <div className="cardDescription">
                    <div style={{display: "flex"}}>
                        <p style={{paddingRight: "4px", color: "lightseagreen"}}>{`${order}.`}</p>
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
                    onChange={() => handleUpdateTaskStatus(!isComplete)}
                    style={{width: "20px", height: "20px"}}
                    />
                </div>
                {renderSubtasks()}
            </div>
        </>
    )
}

export default TaskCard