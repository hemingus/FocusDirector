// Task types

export type Task = {
    id: string
    description: string
    isComplete: boolean
    subtasks: Subtask[]
    order: number
}

export type Subtask = {
    taskId: string
    id: string
    description: string
    isComplete: boolean
    steps: Step[]
    order: number
}

export type Step = {
    taskId: string
    subtaskId: string
    id: string
    description: string
    isComplete: boolean
    order?: number
}


