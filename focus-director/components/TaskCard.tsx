"use client";

import '../styles/styles.scss'
import TaskWindow from './TaskWindow'
import SubTaskWindow from './SubTaskWindow';
import { useState, useEffect } from 'react'
import { Task, Subtask } from './TaskTypes'


const TaskCard: React.FC<Task> = ({taskId, description, isComplete, subtasks}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)
    const [subTaskList, setSubTaskList] = useState<Subtask[]>(subtasks)
    const [showSubtasks, setShowSubtasks] = useState(false)

    useEffect(() => {
        setSubTaskList(subtasks)
    }, [subtasks])



    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
        console.log(showSubtasks)
        console.log(subtasks)
    }

    const renderSubtasks = () => {
        if (showSubtasks && subTaskList) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide subtasks</button>
                <SubTaskWindow taskId={taskId} subTasks={subTaskList} />  
            </div>
            )
        }
        return renderButton();
    }

    const renderButton = () => {
        if (!showSubtasks && subTaskList) {
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
                <p>{description}</p>
                {renderSubtasks()}
            </div>
            
        </>
    )
}

export default TaskCard