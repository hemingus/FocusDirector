"use client";

import TaskWindow from './TaskWindow'
import FocusMode from './FocusMode';
import '../styles/styles.scss'
import { useState } from 'react'
import { TaskDataProvider } from './TaskDataContext'

const DashBoard = () => {
    const [focusMode, setFocusMode] = useState(false)

    const taskMode = () => {
        if (focusMode) return (
            <div>
                <button className="exitButton" style={{position: 'fixed', zIndex: 3, top: "0", left: "0"}} onClick={() => setFocusMode(false)}>EXIT</button>
                <FocusMode/>
            </div>
        )
        return <TaskWindow />
    }

    return (
        <>
            <h2>Dashboard</h2>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <button className="focusButton" focus-tooltip="Let's go! 🙏" onClick={() => setFocusMode(true)}>FOCUS</button>
            </div>
            <section className="taskSection">
                <div>
                    <TaskDataProvider>
                        <h3>Tasks:</h3>
                        {taskMode()}  
                    </TaskDataProvider>
                </div>
            </section>
        </>
    )
}

export default DashBoard