import '../styles/styles.scss'
import { useState } from 'react'

type TaskCardProps = {
    description: string
}

const TaskCard: React.FC<TaskCardProps> = ({description}) => {
    const [focused, setFocused] = useState(false)

    
    if (focused) {
        return (
            <div className="taskCardFocused" onClick={() => setFocused(false)}>
                <p>{description}</p>
            </div>
        )
    }
    return (
        <div className="taskCard" onClick={() => setFocused(true)}>
            <p>{description}</p>
        </div>
    )
}

export default TaskCard