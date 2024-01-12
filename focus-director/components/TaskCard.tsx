"use client";

import '../styles/styles.scss'
import TaskWindow from './TaskWindow'
import SubtaskWindow from './SubtaskWindow';
import { useState, useEffect } from 'react'
import { Task, Subtask } from './TaskTypes'
import { updateTaskStatus } from './API_methods';
import JSXStyle from 'styled-jsx/style';



const TaskCard: React.FC<Task> = ({id, description, isComplete, subtasks}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)
    const [subtaskList, setSubtaskList] = useState<Subtask[]>(subtasks)
    const [showSubtasks, setShowSubtasks] = useState(false)

    useEffect(() => {
        setSubtaskList(subtasks)
    }, [subtasks])



    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
        console.log(showSubtasks)
        console.log(subtasks)
    }

    const renderSubtasks = () => {
        if (showSubtasks && subtaskList) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide subtasks</button>
                <SubtaskWindow taskId={id} subtasks={subtaskList} />  
            </div>
            )
        }
        return renderButton();
    }

    const handleUpdateTaskStatus = async (taskId: string, status: boolean) => {
        await updateTaskStatus(`https://hemingmusicapi.azurewebsites.net/TaskEntity/${taskId}`, status)
        setCompleted(status)
    } 

    const renderButton = () => {
        if (!showSubtasks && subtaskList) {
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
            <div className={completed ? "taskCardCompleted" : "taskCard"}>
                <p style={completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{description}</p>
                <button onClick={() => handleUpdateTaskStatus(id, !completed)}>{statusText()}</button>
                {renderSubtasks()}
            </div>
        </>
    )
}

export default TaskCard