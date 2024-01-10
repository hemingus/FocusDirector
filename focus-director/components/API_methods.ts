

export const addTask = async (url: string, text: string) => {
    const newTask = {
        description: text
    }
    try {
        await fetch(url, {
            method: 'POST', 
            headers: {
            "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newTask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const deleteTask = async (url: string) => {
    try {
        await fetch(url, {
            method: 'DELETE' 
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateTaskStatus = async (url: string, status: boolean) => {
    const patchTask = {
        IsComplete: status
    } 
    try {
        await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
                }, 
            body: JSON.stringify(patchTask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const addSubtask = async (taskId: string, text: string) => {
    const subtaskToAdd = {
        Description: text
    }
    try {
        await fetch(`https://hemingmusicapi.azurewebsites.net/taskentity/${taskId}/subtask`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
                }, 
            body: JSON.stringify(subtaskToAdd)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const deleteSubtask = async (taskId: string, subtaskId: string) => {
    try {
        await fetch(`https://hemingmusicapi.azurewebsites.net/taskentity/${taskId}/subtask/${subtaskId}`, {
            method: 'DELETE'
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}