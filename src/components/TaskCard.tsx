"use client";

import SubtaskWindow from './SubtaskWindow'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { useState, useContext, useEffect } from 'react'
import { Task } from './TaskTypes'
import { updateTaskStatus, updateTaskDescription, updateTaskOrder, deleteTask } from './API_methods'
import TaskDataContext from './TaskDataContext'
import ExpandIcon from '../app/assets/icons/expand.svg'
import CollapseIcon from '../app/assets/icons/collapse.svg'
import TrashIcon from '../app/assets/icons/trashcan.svg'
import { Tooltip } from './Tooltip/Tooltip';
import { useGlobalConfirm } from './ConfirmDialog/ConfirmContext';

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
    const totalSteps = calculateTotalSteps();
    const [newDescription, setNewDescription] = useState(description)
    const confirm = useGlobalConfirm();
    const styles = isComplete ?
        {card: "taskCardCompleted", 
            expandCollapse: "expandCollapseCompleted",
            trashIcon: "trashIconCompleted",
            number: "completedNumber"
        } 
        :
        {card: "taskCard", 
            expandCollapse: "expandCollapseSubtasks",
            trashIcon: "trashIconTask",
            number: "taskNumber"
        }

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

    function calculateTotalSteps() {
        const totalSteps = subtasks.reduce((sum, subtask) => {
            return sum + subtask.steps.length;
        }, 0)
        return totalSteps;
    }

    // Function to build the delete confirmation message
    function buildDeleteTaskMessage() {
        const lines = [`"${description}"\n`];
        const subtaskWord = subtasks.length === 1 ? "subtask" : "subtasks";
        const stepWord = totalSteps === 1 ? "step" : "steps";
        
        if (subtasks.length > 0) {
            lines.push(`Including:\n- ${subtasks.length} ${subtaskWord}`);
        }

        if (totalSteps > 0) {
            lines.push(`- ${totalSteps} ${stepWord}`);
        }

        lines.push('\nAre you sure you want to DELETE this Task?');

        return lines.join('\n');
    }

    useEffect(() => {
        setNewDescription(description);
      }, [description]);

    const renderSubtasks = () => {
        if (showSubtasks && subtasks) {
            return (
            <div>
                <Tooltip content={`Hide subtasks`} color="#006600">
                    <div
                        onClick={() => toggleSubtasks()}
                        className={styles.expandCollapse}>
                        <CollapseIcon />
                        <span>{`Subtasks`}</span>
                    </div>
                </Tooltip>
                <SubtaskWindow taskId={id} subtasks={[...subtasks].sort((a, b) => a.order - b.order)} />  
            </div>
            )
        }
        return (
            <Tooltip content={`Expand subtasks`} color="#006600">
                <div
                    onClick={() => toggleSubtasks()}
                    className={styles.expandCollapse}>
                        <ExpandIcon />
                        <span>{`${subtasks.length}`}</span>
                </div>
            </Tooltip>
        )
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

    const handleRemoveTask = async (taskId: string) => {
        await deleteTask(taskId)
        await getTasks();
    }

    return (
            <div 
            className={styles.card}
            ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <div className="cardDescription">
                    <div className="cardTextArea">
                        <span className={styles.number}>{`${order}.`}</span>
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
                    <div className="cardTailSection">
                        <input
                        type="checkbox"
                        checked={isComplete}
                        onChange={() => handleUpdateTaskStatus(!isComplete)}
                        className="customCheckbox"
                        checkbox-tooltip={isComplete ? "uncheck" : "Done☑"}
                        />
                        <Tooltip content="DELETE Task" color="darkred">
                            <TrashIcon 
                                className={styles.trashIcon}
                                onClick={() =>
                                    confirm(
                                        {
                                        title: 'Delete Task',
                                        message: buildDeleteTaskMessage(),
                                        confirmLabel: 'Delete',
                                        cancelLabel: 'Cancel',
                                        },
                                        () => handleRemoveTask(id)
                                    )
                                }
                            />
                        </Tooltip>
                    </div>
                </div>
                {renderSubtasks()}
            </div>
    )
}

export default TaskCard