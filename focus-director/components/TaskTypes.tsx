// Task types

export type Task = {
    id: string
    description: string
    isComplete: boolean
    subtasks: Subtask[]
}

export type Subtask = {
    taskId: string
    id: string
    description: string
    isComplete: boolean
    steps: Step[]
}

export type Step = {
    taskId: string
    subtaskId: string
    id: string
    description: string
    isComplete: boolean
}


