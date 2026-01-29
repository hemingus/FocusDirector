"use client";

import SubtaskCard from './SubtaskCard'
import { useState, useContext } from 'react'
import { Subtask } from './TaskTypes'
import { addSubtask } from './API_methods'
import TaskDataContext from './TaskDataContext'
import AddIcon from '../app/assets/icons/add.svg'

const SubtaskWindow: React.FC<{ taskId: string, subtasks: Subtask[] }> = ({taskId, subtasks}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [description, setDescription] = useState<string>('')

    const submitNewSubtask = async () => {
        if (description.trim() !== '') {
            await addSubtask(taskId, description, subtasks.length+1)
            getTasks()
            setDescription('')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    return (
        <div className="subtaskContainer">
            <ul>
                {subtasks.map((subtask, index) => (
                    <li className="subtaskWindow" key={index}>
                        <SubtaskCard order={subtask.order} taskId={taskId} id={subtask.id} description={subtask.description} isComplete={subtask.isComplete} steps={subtask.steps}/>
                    </li>
                ))}
            </ul>
            <div className="inputRowSubtask">
                <input
                type="text"
                value={description}
                onChange={handleChange}
                placeholder="Describe subtask"
                onKeyDown={(event) => {event.key === 'Enter' ? submitNewSubtask() : () => {}}}
                />
                <button onClick={submitNewSubtask}><AddIcon className="addIcon" />Add</button>
            </div>
        </div>
    )
}

export default SubtaskWindow