"use client";

import StepWindow from './StepWindow'
import { useState, useContext, useEffect } from 'react'
import { Subtask } from './TaskTypes'
import { updateSubtaskStatus, updateSubtaskDescription, updateSubtaskOrder, deleteSubtask } from './API_methods';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import TaskDataProvider from './TaskDataContext'
import ExpandIcon from '../app/assets/icons/expand.svg'
import CollapseIcon from '../app/assets/icons/collapse.svg'
import TrashIcon from '../app/assets/icons/trashcan.svg'
import { Tooltip } from './Tooltip/Tooltip';
import { useGlobalConfirm } from './ConfirmDialog/ConfirmContext';

const ItemTypes = {
    SUBTASK_CARD: 'subtaskCard'
}
  
interface DragItem {
    type: string
    id: string
    order: number
}

const SubtaskCard: React.FC<Subtask> = ({taskId, id, description, isComplete, steps, order}) => {
    const { getTasks } = useContext(TaskDataProvider)!
    const [showSteps, setShowSteps] = useState(false)
    const [newDescription, setNewDescription] = useState(description)
    const confirm = useGlobalConfirm();
    const styles = isComplete ?
        {card: "taskCardCompleted", 
            expandCollapse: "expandCollapseCompleted",
            trashIcon: "trashIconCompleted",
            number: "completedNumber"} 
        :
        {card: "taskCard", 
            expandCollapse: "expandCollapseSteps",
            trashIcon: "trashIconSubtask",
            number: "subtaskNumber"}

    useEffect(() => {
        setNewDescription(description);
      }, [description])

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.SUBTASK_CARD,
        item: { type: ItemTypes.SUBTASK_CARD, id, order } as DragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            }) as { isDragging: boolean }
      });

    const [, drop] = useDrop({
        accept: ItemTypes.SUBTASK_CARD,
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
        },
        drop: async (item: DragItem, monitor: DropTargetMonitor) => {
            const targetOrder = order
            console.log(`dropped: \n id:${item.id} \n index:${item.order} \n new index:${targetOrder}`)
            await handleUpdateSubtaskOrder(item.id, item.order, targetOrder)
        }
    });

    const handleUpdateSubtaskOrder = async (id: string, oldOrder: number, newOrder: number) => {
        if (oldOrder === newOrder) {
            return
        }
        console.log(newOrder)
        await updateSubtaskOrder(taskId, id, newOrder)
        getTasks()
    }

    const toggleSteps = () => {
        setShowSteps(!showSteps)
    }

    const renderSubtasks = () => {
        if (showSteps && steps) {
            return (
            <div>
                <div className={styles.expandCollapse}>   
                    <CollapseIcon onClick={() => toggleSteps()}/>
                    <span>{`Steps`}</span>
                </div>
                <StepWindow taskId={taskId} subtaskId={id} steps={[...steps].sort((a, b) => a.order - b.order)} />  
            </div>
            )
        }
        return <div 
                    onClick={() => toggleSteps()}
                    className={styles.expandCollapse}>
                    <ExpandIcon />
                    <span>{`${steps.length}`}</span>
                </div>
    }

    const handleUpdateSubtaskStatus = async (status: boolean) => {
        await updateSubtaskStatus(taskId, id, status)
        getTasks()
        setShowSteps(!status)
    }

    const handleDescriptionUpdate = async () => {
        if (newDescription !== description) {
            await updateSubtaskDescription(taskId, id, newDescription)
            getTasks()
        }
    }

    const handleRemoveSubtask = async (subtaskId: string) => {
        await deleteSubtask(taskId, subtaskId)
        getTasks()
    }
    
    return (
        <>
            <div className={isComplete ? "taskCardCompleted" : "subtaskCard"}
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
                        onChange={() => handleUpdateSubtaskStatus(!isComplete)}
                        className="customCheckbox"
                        checkbox-tooltip={isComplete ? "uncheck" : "Done☑"}
                        />
                        <Tooltip content="DELETE Subtask" color="darkred">
                            <TrashIcon 
                                className={styles.trashIcon}
                                onClick={() =>
                                    confirm(
                                        {
                                        title: 'Delete Subtask',
                                        message: 'Are you sure you want to delete this subtask?',
                                        confirmLabel: 'Delete',
                                        cancelLabel: 'Cancel',
                                        },
                                        () => handleRemoveSubtask(id)
                                    )
                                }
                            />
                        </Tooltip>
                    </div>
                </div>                   
                {renderSubtasks()}
            </div>
        </>
    )
}

export default SubtaskCard