"use client";

import TaskWindow from './TaskWindow'
import '../styles/styles.scss'
import { TaskDataProvider } from './TaskDataContext'

const DashBoard = () => {

    return (
        <div>
            <h2>Dashboard</h2>
            <section className="taskSection">
                <div>
                    <h3>Tasks:</h3>
                    <TaskDataProvider>
                        <TaskWindow />   
                    </TaskDataProvider>
                </div>
            </section>
        </div>
    )
}

export default DashBoard