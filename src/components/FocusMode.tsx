"use client";

import { Task, Subtask, Step } from './TaskTypes'
import TaskDataContext from './TaskDataContext'
import { useState, useEffect, useContext } from 'react'
import { updateTaskStatus, updateSubtaskStatus, updateStepStatus } from './API_methods'
import DownArrow from './DownArrow';

type FocusTarget = Task | Subtask | Step

const noTarget: FocusTarget = {id: "", description: "You have completed all your tasks!", isComplete: true, subtasks: [], order: 0}

const FocusMode = () => {
    const { getTasks, taskData} = useContext(TaskDataContext)!
    const [focused, setFocused] = useState<FocusTarget>(noTarget)
    const [focusParents, setFocusParents] = useState<FocusTarget[]>([])
    const [focusTargetStyle, setFocusTargetStyle] = useState("");


    // Focuses the next logical step/subtask/task based on their order.
    const nextFocus = () => {
        setFocusParents([])
        var target: FocusTarget = noTarget
        const tasksTodo: Array<Task> = taskData.filter(task => !task.isComplete)
        if (tasksTodo.length > 0) {
            var task = tasksTodo.sort((a, b) => a.order - b.order)[0]
            target = task
            const subtasksTodo: Array<Subtask> = task.subtasks.filter(subtask => !subtask.isComplete)
            if (subtasksTodo.length > 0) {
                setFocusParents([task])
                var subtask = subtasksTodo.sort((a, b) => a.order - b.order)[0]
                target = subtask
                const stepsTodo: Array<Step> = subtask.steps.filter(step=> !step.isComplete)
                if (stepsTodo.length > 0) {
                    setFocusParents([task, subtask])
                    var step = stepsTodo.sort((a, b) => a.order - b.order)[0]
                    target = step
                }
            }
        }
        setFocusTargetStyle(handleTargetStyle(target))
        setFocused(target)
    }

    function isTask(obj: any): obj is Task {
        return 'subtasks' in obj
    }
    
    function isSubtask(obj: any): obj is Subtask {
        return 'steps' in obj;
    }

    const handleTargetStyle = (target: FocusTarget) => {
        if (isTask(target)) return "focusTaskDescription"
        else if (isSubtask(target)) return "focusSubtaskDescription"
        else return "focusStepDescription"
    }

    const parentStyle = (target: FocusTarget) => {
        if (isTask(target)) return "completedTasks"
        return "completedSubtasks"
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
        if (isTask(focused) && focused.subtasks.length > 0) {
            return (
                <div className="subListContainer">
                    <h5 style={{color: "silver"}}>Subtasks completed!</h5>
                    <ul>
                        {focused.subtasks.map((subtask, index) => (
                            <li className="completedSubtasks" key={index}>
                                <p>{subtask.description} ✔️</p>
                            </li>
                        ))}
                    </ul>       
                </div>
            )
        } else if (isSubtask(focused) && focused.steps.length > 0) {
            return (
                <div className="subListContainer">
                    <h5 style={{color: "silver"}}>Steps completed!</h5>
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
        return <h5 style={{color: "silver"}}>⍟ Focused ⍟</h5>
    }

    useEffect(() => {
        nextFocus()
    }, [taskData])

    return (
        <div className="focusScreen">
            <div className="focusContent">
                {focusParents.map((parent, index) => (
                    <div className="focusParentContainer">
                    <p key={index} className={parentStyle(parent)}>{parent.description}</p>
                    <DownArrow/>
                    </div>
                ))}
                <p key={focused.description} className={focusTargetStyle}>{focused.description}</p>
                <button className="goNextButton" onClick={() => goNext()}>Done ☑  <span style={{margin: "20px"}}></span>   Next ➠</button>
                {subList()}
            </div>
        </div>
    )
}

export default FocusMode