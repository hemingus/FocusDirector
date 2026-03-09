
// task methods
const DEV_BASE_URL = "https://localhost:7172"
const PROD_BASE_URL = "https://hemingmusicapi.azurewebsites.net"
const BASE_URL = DEV_BASE_URL

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  })
}


export const addTask = async (text: string, index: number) => {
    const newTask = {
        description: text,
        order: index
    }
    try {
        await apiFetch(`${BASE_URL}/TaskEntity`, {
            method: 'POST', 
            body: JSON.stringify(newTask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        await apiFetch(`/TaskEntity/${taskId}`, {
            method: 'DELETE' 
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateTaskStatus = async (taskId: string, status: boolean) => {
    const patchTask = {
        IsComplete: status
    } 
    try {
        await apiFetch(`/TaskEntity/${taskId}`, {
            method: 'PATCH',
            body: JSON.stringify(patchTask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateTaskDescription = async (taskId: string, description: string) => {
    const patchTask = {
        description: description
    } 
    try {
        await apiFetch(`/TaskEntity/${taskId}/description`, {
            method: 'PATCH', 
            body: JSON.stringify(patchTask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateTaskOrder = async (taskId: string, newOrder: number) => {
    const patchTask = {
        order: newOrder
    } 
    try {
        await fetch(`/TaskEntity/${taskId}/order`, {
            method: 'PATCH',
            body: JSON.stringify(patchTask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}


// subtask methods

export const addSubtask = async (taskId: string, text: string, order: number) => {
    const subtaskToAdd = {
        Description: text,
        Order: order
    }
    try {
        await apiFetch(`/taskentity/${taskId}/subtask`, {
            method: 'PATCH', 
            body: JSON.stringify(subtaskToAdd)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const deleteSubtask = async (taskId: string, subtaskId: string) => {
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}`, {
            method: 'DELETE'
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateSubtaskStatus = async (taskId: string, subtaskId: string, status: boolean) => {
    const patchSubtask = {
        IsComplete: status
    } 
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}`, {
            method: 'PATCH',
            body: JSON.stringify(patchSubtask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateSubtaskDescription = async (taskId: string, subtaskId: string, description: string) => {
    const patchSubtask = {
        Description: description
    } 
    try {
        await apiFetch(`/TaskEntity/${taskId}/subtask/${subtaskId}/description`, {
            method: 'PATCH',
            body: JSON.stringify(patchSubtask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateSubtaskOrder = async (taskId: string, subtaskId: string, order: number) => {
    const patchSubtask = {
        Order: order
    } 
    try {
        await apiFetch(`/TaskEntity/${taskId}/subtask/${subtaskId}/order`, {
            method: 'PATCH',
            body: JSON.stringify(patchSubtask)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

// step methods

export const addStep = async (taskId: string, subtaskId: string, text: string, order: number) => {
    const stepToAdd = {
        Description: text,
        Order: order
    }
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}/step`, {
            method: 'PATCH',
            body: JSON.stringify(stepToAdd)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const deleteStep = async (taskId: string, subtaskId: string, stepId: string) => {
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}`, {
            method: 'DELETE'
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateStepStatus = async (taskId: string, subtaskId: string, stepId: string, status: boolean) => {
    const patchStep = {
        IsComplete: status
    } 
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}`, {
            method: 'PATCH',
            body: JSON.stringify(patchStep)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateStepDescription = async (taskId: string, subtaskId: string, stepId: string, description: string) => {
    const patchStep = {
        Description: description
    } 
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}/description`, {
            method: 'PATCH',
            body: JSON.stringify(patchStep)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}

export const updateStepOrder = async (taskId: string, subtaskId: string, stepId: string, order: number) => {
    const patchStep = {
        Order: order
    }
    try {
        await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}/order`, {
            method: 'PATCH',
            body: JSON.stringify(patchStep)
        })
    }
    catch (err: any) {
        alert(err.message)
    }
}