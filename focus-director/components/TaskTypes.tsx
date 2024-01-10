// Task types

export type Task = {
    taskId: string
    description: string
    isComplete: boolean
    subtasks: Subtask[]
}

export type Subtask = {
    id: string
    description: string
    isComplete: boolean
    steps: Step[]
}

export type Step = {
    description: string
    isComplete: boolean
}


