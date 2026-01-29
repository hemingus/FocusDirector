"use client";

import TaskCard from './TaskCard'
import { useState, useContext } from 'react'
import { addTask } from './API_methods'
import { DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import TaskDataContext from './TaskDataContext'
import AddIcon from '../app/assets/icons/add.svg'

const isTouchDevice = typeof window !== 'undefined' && 
                      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const TaskWindow: React.FC = () => {
    const {taskData, getTasks, loading} = useContext(TaskDataContext)!
    const [taskDescription, setTaskDescription] = useState<string>('')

    const submitNewTask = () => {
        if (taskDescription.trim() !== '') {
            addTask(taskDescription, taskData.length + 1)
            .then((response) => {
                console.log(response);
                getTasks();
                setTaskDescription('')
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
    }

    const backend = isTouchDevice ? TouchBackend : HTML5Backend;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(event.target.value);
    }

    if (loading) {
        return <h1 className="loadingAnimation">Loading data...</h1>
    } else {
        return (
            <>
                
                <div className="taskContainer">
                    <h2>Tasks</h2>
                    <DndProvider backend={backend}>
                    <ul>
                        {taskData.map((task, index) => (
                            <li className="taskWindow" key={index}>
                                <TaskCard order={task.order} id={task.id} description={task.description} isComplete={task.isComplete} subtasks={task.subtasks}/>
                            </li>
                        ))}
                    </ul>
                    </DndProvider>
                    <div className="inputRowTask">
                        <input
                        type="text"
                        value={taskDescription}
                        onChange={handleChange}
                        placeholder="Describe task"
                        onKeyDown={(event) => {event.key === 'Enter' ? submitNewTask() : () => {}}}
                        />
                        <button onClick={submitNewTask}><AddIcon className="addIcon"/>Add</button>
                    </div>
                </div>
            </>
        )
    }
}

export default TaskWindow