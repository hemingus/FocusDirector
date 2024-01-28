"use client";

import '../styles/styles.scss'
import StepWindow from './StepWindow'
import { useState, useContext, useEffect } from 'react'
import { Subtask } from './TaskTypes'
import { updateSubtaskStatus, updateSubtaskDescription, updateSubtaskOrder } from './API_methods';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import TaskDataProvider from './TaskDataContext'

const ItemTypes = {
    SUBTASK_CARD: 'subtaskCard',
  };
  
  interface DragItem {
    type: string;
    id: string;
    order: number;
  }

const SubtaskCard: React.FC<Subtask> = ({taskId, id, description, isComplete, steps, order}) => {
    const { getTasks } = useContext(TaskDataProvider)!
    const [focused, setFocused] = useState(false)
    const [showSteps, setShowSteps] = useState(false)
    const [newDescription, setNewDescription] = useState(description)

    useEffect(() => {
        setNewDescription(description);
      }, [description]);

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
                <button onClick={() => toggleSteps()}>Hide steps</button>
                <StepWindow taskId={taskId} subtaskId={id} steps={[...steps].sort((a, b) => a.order - b.order)} />  
            </div>
            )
        }
        return renderButton()
    }

    const renderButton = () => {
        if (!showSteps && steps) {
            return (
                <button onClick={() => toggleSteps()}>Show steps: {steps.length}</button>
            )
        }
        return (
            <div>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        )
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

    if (focused) {
        return (
            <div className="taskCardFocused" onClick={() => setFocused(false)}>
                <p>{description}</p>
                <button>Done ☑ -~⍟~- Next ➠</button>
            </div>
        )
    }
    return (
        <>
            <div className={isComplete ? "taskCardCompleted" : "subtaskCard"}
            ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <div className="cardDescription">
                    <div style={{display: "flex"}}>
                        <span style={{paddingRight: "4px", color: "yellowgreen"}}>{`${order}.`}</span> 
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
                    onChange={() => handleUpdateSubtaskStatus(!isComplete)}
                    className="customCheckbox"
                    checkbox-tooltip={isComplete ? "uncheck" : "Done☑"}
                    />
                </div>                   
                {renderSubtasks()}
            </div>
        </>
    )
}

export default SubtaskCard