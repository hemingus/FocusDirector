// Task types

export type Step = {
    description: string
    isComplete: boolean
}

export type Subtask = {
    description: string
    isComplete: boolean
    steps: Step[]
}

export type Task = {
    description: string
    isComplete: boolean
    subTasks: Subtask[]
}