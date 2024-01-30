"use client";

import TaskWindow from './TaskWindow'
import FocusMode from './FocusMode';
import '../styles/styles.scss'
import { TaskDataProvider } from './TaskDataContext'

const DashBoard = () => {

    return (
        <div>
            <h2>Dashboard</h2>
            <section className="taskSection">
                <div>
                    
                    <TaskDataProvider>
                        <FocusMode />
                        <h3>Tasks:</h3>
                        <TaskWindow />   
                    </TaskDataProvider>
                </div>
            </section>
        </div>
    )
}

export default DashBoard