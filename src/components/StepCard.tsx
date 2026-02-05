"use client";

import { useState, useContext, useEffect } from 'react'
import { Step } from './TaskTypes'
import { updateStepStatus, updateStepDescription, updateStepOrder, deleteStep } from './API_methods'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import TaskDataContext from './TaskDataContext'
import TrashIcon from '../app/assets/icons/trashcan.svg'
import { Tooltip } from './Tooltip/Tooltip';
import { useGlobalConfirm } from './ConfirmDialog/ConfirmContext';

const ItemTypes = {
    STEP_CARD: 'stepCard'
}
  
interface DragItem {
    type: string
    id: string
    order: number
}

const StepCard: React.FC<Step> = ({taskId, subtaskId, id, description, isComplete, order}) => {
    const { getTasks } = useContext(TaskDataContext)!
    const [newDescription, setNewDescription] = useState(description)
    const confirm = useGlobalConfirm();
    const styles = isComplete ?
        {
        card: "taskCardCompleted",
        number: "completedNumber",
        trashIcon: "trashIconCompleted"
        }
        :
        {
        card: "stepCard",
        number: "stepNumber",
        trashIcon: "trashIconStep"
        }

    useEffect(() => {
        setNewDescription(description);
        }, [description])

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.STEP_CARD,
        item: { type: ItemTypes.STEP_CARD, id, order } as DragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            }) as { isDragging: boolean }
      });

    const [, drop] = useDrop({
        accept: ItemTypes.STEP_CARD,
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
        },
        drop: async (item: DragItem, monitor: DropTargetMonitor) => {
            const targetOrder = order;
            console.log(`dropped: \n id:${item.id} \n index:${item.order} \n new index:${targetOrder}`)
            await handleUpdateStepOrder(item.id, item.order, targetOrder)
        }
    });

    const handleUpdateStepOrder = async (stepId: string, oldOrder: number, newOrder: number) => {
        if (newOrder === oldOrder) {
            return
        }
        await updateStepOrder(taskId, subtaskId, stepId, newOrder)
        getTasks()
    }

    const handleUpdateStepStatus = async (status: boolean) => {
        await updateStepStatus(taskId, subtaskId, id, status)
        getTasks()
    } 

    const handleDescriptionUpdate = async () => {
        if (newDescription !== description) {
            await updateStepDescription(taskId, subtaskId, id, newDescription)
            getTasks()
        }
    }

    const handleRemoveStep = async (stepId: string) => {
        await deleteStep(taskId, subtaskId, stepId)
        getTasks()
    }

    return (
        <>
            <div className={isComplete ? "taskCardCompleted" : "stepCard"}
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
                        onChange={() => handleUpdateStepStatus(!isComplete)}
                        className="customCheckbox"
                        checkbox-tooltip={isComplete ? "uncheck" : "Done☑"}
                        />
                        <Tooltip content="DELETE Step" color="darkred">
                            <TrashIcon 
                                className={styles.trashIcon}
                                onClick={() =>
                                    confirm(
                                        {
                                        title: 'Delete Step',
                                        message: `"${description}"\n\n Are you sure you want to delete this step?`,
                                        confirmLabel: 'Delete',
                                        cancelLabel: 'Cancel',
                                        },
                                        () => handleRemoveStep(id)
                                    )
                                }
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepCard