"use client";

import '../styles/styles.scss'
import { useState } from 'react'
import { Step } from './TaskTypes'

const StepCard: React.FC<Step> = ({description, isComplete}) => {
    const [completed, setCompleted] = useState(isComplete)
    const [focused, setFocused] = useState(false)

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
            <div className="stepCard">
                <p>{description}</p>
                <button onClick={() => setFocused(true)}>Focus</button>
            </div>
        </>
    )
}

export default StepCard