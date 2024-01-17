"use client";

import TaskWindow from './TaskWindow'
import '../styles/styles.scss'
import { useState, useEffect } from 'react'
import { TaskDataProvider } from './TaskDataContext'

const DashBoard = () => {


    return (
        <div>
            <h2>DASHBOARD</h2>
            <section className="taskSection">
                <div>
                    <h3 style={{color: "white"}}>Tasks:</h3>
                    <TaskDataProvider>
                        <TaskWindow />
                    </TaskDataProvider>
                </div>
            </section>
        </div>
    )
}

export default DashBoard