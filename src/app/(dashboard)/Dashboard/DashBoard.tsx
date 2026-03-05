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
            <header>
                <h1>Dashboard</h1>
            </header>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <button className="focusButton" focus-tooltip="Focus Mode" onClick={() => setFocusMode(true)}><img src="./assets/focus_button.png" /></button>
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