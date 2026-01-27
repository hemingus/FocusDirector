"use client";

import { useState, useEffect, createContext, ReactNode, SetStateAction, Dispatch } from 'react'
import { Task } from './TaskTypes' 

interface TaskDataContextProps {
    taskData: Task[]
    setTaskData: Dispatch<SetStateAction<Task[]>>
    getTasks: () => Promise<void>
    loading: boolean
}

interface TaskDataProviderProps {
    children: ReactNode
}

const TaskDataContext = createContext<TaskDataContextProps | undefined>(undefined);

export const TaskDataProvider: React.FC<TaskDataProviderProps> = ({ children }) => {
    const [taskData, setTaskData] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)

    const getTasks = async (url = "https://hemingmusicapi.azurewebsites.net/TaskEntity") => {
        await fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTaskData(data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    const contextValue: TaskDataContextProps = {
        taskData, 
        setTaskData,
        getTasks,
        loading
    }

    return (
        <TaskDataContext.Provider value={contextValue}>
            {children}
        </TaskDataContext.Provider>
    )
}

export default TaskDataContext


    