"use client";

import TaskWindow from '../../../components/TaskWindow'
import FocusMode from '../../../components/FocusMode';
import { useState } from 'react'
import { TaskDataProvider } from '../../../components/TaskDataContext'

const DashBoard = () => {
    const [focusMode, setFocusMode] = useState(false)

    const taskMode = () => {
        if (focusMode) return (
            <div onClick={() => {
                setFocusMode(false);
                }}>
                <FocusMode/>
            </div>
        )
        return <TaskWindow />
    }

    return (
        <>
            <h2>Dashboard</h2>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <button className="focusButton" focus-tooltip="Lock in!" onClick={() => setFocusMode(true)}>FOCUS</button>
            </div>
            <section className="taskSection">
                <div>
                    <TaskDataProvider>
                        {taskMode()}  
                    </TaskDataProvider>
                </div>
            </section>
        </>
    )
}

export default DashBoard