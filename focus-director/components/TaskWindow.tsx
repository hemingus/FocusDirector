"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState, useContext } from 'react'
import { deleteTask, addTask } from './API_methods'
import { DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import TaskDataContext from './TaskDataContext'

const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints);

const TaskWindow: React.FC = () => {
    const {taskData, getTasks} = useContext(TaskDataContext)!
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

    const handleRemoveTask = async (taskId: string) => {
        await deleteTask(taskId)
        await getTasks();
    }

    return (
        <>
        <div className="taskContainer">
            <DndProvider backend={backend}>
            <ul>
                {taskData.map((task, index) => (
                    <li className="taskWindow" key={index}>
                        <TaskCard order={task.order} id={task.id} description={task.description} isComplete={task.isComplete} subtasks={task.subtasks}/>
                        <button className="deleteButton" onClick={() => handleRemoveTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
            </DndProvider>
            <div>
                <label style={{color: "lightseagreen"}}>new task:</label>
                <input
                type="text"
                value={taskDescription}
                onChange={handleChange}
                placeholder="Describe task"
                onKeyDown={(event) => {event.key === 'Enter' ? submitNewTask() : () => {}}}
                />
                <button onClick={submitNewTask}>add task</button>
            </div>
        </div>
        </>
    )
}

export default TaskWindow