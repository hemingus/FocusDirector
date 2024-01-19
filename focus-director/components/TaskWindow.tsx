"use client";

import TaskCard from './TaskCard'
import '../styles/styles.scss'
import { useState, useContext } from 'react'
import {deleteTask, addTask} from './API_methods'
import TaskDataContext from './TaskDataContext'

const TaskWindow: React.FC = () => {
    const {taskData, getTasks} = useContext(TaskDataContext)!
    const [taskDescription, setTaskDescription] = useState<string>('')

    const submitNewTask = () => {
        if (taskDescription.trim() !== '') {
            addTask(taskDescription)
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
            <ul>
                {taskData.map((task, index) => (
                    <li className="taskWindow" key={index}>
                        <TaskCard order={index + 1} id={task.id} description={task.description} isComplete={task.isComplete} subtasks={task.subtasks}/>
                        <button onClick={() => handleRemoveTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <div>
                <label>new task:</label>
                <input
                type="text"
                value={taskDescription}
                onChange={handleChange}
                placeholder="Describe task"
                />
                <button onClick={submitNewTask}>add task</button>
            </div>
        </div>
        </>
    )
}

export default TaskWindow