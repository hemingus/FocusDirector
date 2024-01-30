"use client";

import '../styles/styles.scss'
import { Task, Subtask, Step } from './TaskTypes'
import TaskDataContext from './TaskDataContext'
import { useState, useEffect, useContext } from 'react'
import { updateTaskStatus, updateSubtaskStatus, updateStepStatus } from './API_methods'

type FocusTarget = Task | Subtask | Step

const noTarget: FocusTarget = {id: "", description: "You have completed all your tasks!", isComplete: true, subtasks: [], order: 0}

const FocusMode = () => {
    const { getTasks, taskData} = useContext(TaskDataContext)!
    const [focusing, setFocusing] = useState(false)
    const [focused, setFocused] = useState<FocusTarget>(noTarget)
    const [color, setColor] = useState<string>("purple")


    // Focuses the next logical step/subtask/task based on their order.
    const nextFocus = () => {
        var target: FocusTarget = noTarget
        const tasksTodo: Array<Task> = taskData.filter(task => !task.isComplete)
        if (tasksTodo.length > 0) {
            var task = tasksTodo.sort((a, b) => a.order - b.order)[0]
            target = task
            const subtasksTodo: Array<Subtask> = task.subtasks.filter(subtask => !subtask.isComplete)
            if (subtasksTodo.length > 0) {
                var subtask = subtasksTodo.sort((a, b) => a.order - b.order)[0]
                target = subtask
                const stepsTodo: Array<Step> = subtask.steps.filter(step=> !step.isComplete)
                if (stepsTodo.length > 0) {
                    var step = stepsTodo.sort((a, b) => a.order - b.order)[0]
                    target = step
                }
            }
        }
        handleColor(target)
        setFocused(target)
    }

    function isTask(obj: any): obj is Task {
        return 'subtasks' in obj
    }
    
    function isSubtask(obj: any): obj is Subtask {
        return 'steps' in obj;
    }

    const handleColor = (target: FocusTarget) => {
        if (isTask(target)) setColor("blue")
        else if (isSubtask(target)) setColor("green")
        else setColor("yellow")
    }
    
    const goNext = async () => {
        if (isTask(focused)) {
            await updateTaskStatus(focused.id, true)
        } else if (isSubtask(focused)) {
            await updateSubtaskStatus(focused.taskId, focused.id, true)
        } else {
            await updateStepStatus(focused.taskId, focused.subtaskId, focused.id, true)
        }
        getTasks()
    }

    const subList = () => {
        if (isTask(focused)) {
            return (
                <div className="subListContainer">
                    <ul>
                        {focused.subtasks.map((subtask, index) => (
                            <li className="completedSubtasks" key={index}>
                                <p>{subtask.description} ✔️</p>
                            </li>
                        ))}
                    </ul>       
                </div>
            )
        } else if (isSubtask(focused)) {
            return (
                <div className="subListContainer">
                    <ul>
                        {focused.steps.map((step, index) => (
                            <li key={index}>
                                <p className="completedSteps">{step.description} ✔️</p>
                            </li>
                        ))}
                    </ul>       
                </div>
            )
        } 
        return
    }

    useEffect(() => {
        nextFocus()
    }, [taskData])

    if (focused && focusing) {
        return (
            <div className="focusScreen">
                <button className="exitButton" onClick={() => setFocusing(false)}> Exit </button>
                <p className="focusDescription" style={{border: "solid", borderColor: color}}>{focused.description}</p>
                {subList()}
                <button className="goNextButton" onClick={() => goNext()}>Done ☑ -~⍟~- Next ➠</button>
            </div>
        )
    }
    return <button onClick={() => setFocusing(true)}>Focus!</button>
}

export default FocusMode