"use client";

import '../styles/styles.scss'
import SubtaskWindow from './SubtaskWindow';
import { useState, useContext } from 'react'
import { Task } from './TaskTypes'
import { updateTaskStatus, updateTaskDescription } from './API_methods';
import TaskDataContext from './TaskDataContext';

const TaskCard: React.FC<Task> = ({id, description, isComplete, subtasks}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [focused, setFocused] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [newDescription, setNewDescription] = useState(description)
    const [showSubtasks, setShowSubtasks] = useState(false)

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
                <button onClick={() => toggleSubtasks()}>Show subtasks</button>
            )
        }
        return (
            <div>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        )
    }

    const statusText = () => {
        if (isComplete) {
            return "Revive"
        }
        return "Complete"
    }

    const toggleEdit = () => {
        setIsEditing(true)
    }

    const handleChange = (event: any) => {
        setNewDescription(event.target.value)
    }

    const handleDescriptionUpdate = async () => {
        if (newDescription !== description) {
            await updateTaskDescription(id, newDescription)
        }
        setIsEditing(false)
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
            <div onDoubleClick={toggleEdit} className={isComplete ? "taskCardCompleted" : "taskCard"}>
                {isEditing ? 
                <input
                type="text"
                value={newDescription}
                onChange={handleChange}
                onBlur={handleDescriptionUpdate}
                />
                : <p style={isComplete ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{description}</p>}
                <button onClick={() => handleUpdateTaskStatus(!isComplete)}>{statusText()}</button>
                {renderSubtasks()}
            </div>
        </>
    )
}

export default TaskCard