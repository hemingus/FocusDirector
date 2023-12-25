// Task types

export type Task = {
    description: string
    isComplete: boolean
    subTasks: Subtask[]
}

export type Subtask = {
    description: string
    isComplete: boolean
    steps: Step[]
}

export type Step = {
    description: string
    isComplete: boolean
}


