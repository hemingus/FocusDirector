"use client";

import '../styles/styles.scss'
import SubtaskWindow from './SubtaskWindow'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { useState, useContext, useEffect } from 'react'
import { Task } from './TaskTypes'
import { updateTaskStatus, updateTaskDescription, updateTaskOrder } from './API_methods'
import TaskDataContext from './TaskDataContext'

const ItemTypes = {
    TASK_CARD: 'taskCard'
  }
  
interface DragItem {
    type: string
    id: string
    order: number
}

const TaskCard: React.FC<Task> = ({id, description, isComplete, subtasks, order}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [showSubtasks, setShowSubtasks] = useState(false)
    const [newDescription, setNewDescription] = useState(description)

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK_CARD,
        item: { type: ItemTypes.TASK_CARD, id, order } as DragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            }) as { isDragging: boolean }
      });

    const [, drop] = useDrop({
        accept: ItemTypes.TASK_CARD,
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
        },
        drop: async (item: DragItem, monitor: DropTargetMonitor) => {
            const dropZoneTaskCardOrder = order;
            console.log(`dropped: \n id:${item.id} \n index:${item.order} \n new index:${dropZoneTaskCardOrder}`)
            await handleUpdateTaskOrder(item.id, item.order, dropZoneTaskCardOrder)
            getTasks()
        }
    });

    const toggleSubtasks = () => {
        setShowSubtasks(!showSubtasks)
    }

    useEffect(() => {
        setNewDescription(description);
      }, [description]);

    const renderSubtasks = () => {
        if (showSubtasks && subtasks) {
            return (
            <div>
                <button onClick={() => toggleSubtasks()}>Hide subtasks</button>
                <SubtaskWindow taskId={id} subtasks={[...subtasks].sort((a, b) => a.order - b.order)} />  
            </div>
            )
        }
        return <button onClick={() => toggleSubtasks()}>Show subtasks: {subtasks.length}</button>
    }

    const handleUpdateTaskOrder = async (taskId: string, currentOrder: number, newOrder: number) => {
        if (newOrder !== currentOrder) {
            await updateTaskOrder(taskId, newOrder)
        }
    }

    const handleUpdateTaskStatus = async (status: boolean) => {
        await updateTaskStatus(id, status)
        getTasks()
        setShowSubtasks(!status)
    } 

    const handleDescriptionUpdate = async () => {
        if (newDescription !== description) {
            await updateTaskDescription(id, newDescription)
            getTasks()
        }
    }

    return (
            <div 
            className={isComplete ? "taskCardCompleted" : "taskCard"}
            ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <div className="cardDescription">
                    <div className="cardTextArea">
                        <span style={{paddingRight: "4px", color: "lightseagreen"}}>{`${order}.`}</span>
                        <p
                        contentEditable={!isComplete}
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
                    className="customCheckbox"
                    checkbox-tooltip={isComplete ? "uncheck" : "Done☑"}
                    />
                </div>
                {renderSubtasks()}
            </div>
    )
}

export default TaskCard