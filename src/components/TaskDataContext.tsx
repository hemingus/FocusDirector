"use client";

import { useState, useEffect, createContext, ReactNode, SetStateAction, Dispatch } from 'react'
import { Task } from './TaskTypes' 

interface TaskDataContextProps {
    taskData: Task[]
    setTaskData: Dispatch<SetStateAction<Task[]>>
    getTasks: (projectId: string) => Promise<void>
    loading: boolean
    projectId: string
}

interface TaskDataProviderProps {
    children: ReactNode
    projectId: string
}

const TaskDataContext = createContext<TaskDataContextProps | undefined>(undefined);

export const TaskDataProvider: React.FC<TaskDataProviderProps> = ({ children, projectId }) => {
    const [taskData, setTaskData] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)

    // old url: "https://hemingmusicapi.azurewebsites.net/TaskEntity"

    const getTasks = async (projectId: string) => {
        const url = `https://localhost:7172/Project/${projectId}/tasks`
        await fetch(url, 
            {
                credentials: "include",
                method: 'GET',
                headers:{
                    "Content-Type": "application/json"
                }
            })
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
        if (projectId) {
            getTasks(projectId)
        }   
    }, [projectId])

    const contextValue: TaskDataContextProps = {
        taskData, 
        setTaskData,
        getTasks,
        loading,
        projectId
    }

    return (
        <TaskDataContext.Provider value={contextValue}>
            {children}
        </TaskDataContext.Provider>
    )
}

export default TaskDataContext


    