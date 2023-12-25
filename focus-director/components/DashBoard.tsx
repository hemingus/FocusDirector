import TaskWindow from './TaskWindow'
import { Task } from './TaskTypes'
import '../styles/styles.scss'

const tasksSample: Task[] = [{
    description: "Make a plan 1 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1 (task 1)",
            isComplete: false,
            steps: [
                {
                    description: "step 1 (subtask 1, task 1)",
                    isComplete: false
                },
                {
                    description: "step 2 (subtask 1, task 1)",
                    isComplete: false
                },
                {
                    description: "step 3 (subtask 1, task 1)",
                    isComplete: false
                }
            ]
        },
        {
            description: "subtask 2",
            isComplete: false,
            steps: []
        },
        {
            description: "subtask 3",
            isComplete: false,
            steps: [
                {
                    description: "step 1 (subtask 3, task 1)",
                    isComplete: false
                }
            ]
        }
    ]},
    {
    description: "Make a plan 2 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1 (task 2)",
            isComplete: false,
            steps: []
        }
    ]},
    {
    description: "Make a plan 3 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: []
    },
    {
    description: "Make a plan 4 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1 (task 4)",
            isComplete: false,
            steps: []
        }
    ]}]

const DashBoard = () => {

    return (
        <div>
            <h2>DASHBOARD</h2>
            <section className="taskSection">
                <div>
                <h3 style={{color: "white"}}>Tasks:</h3>
                <TaskWindow />
                </div>
            </section>
        </div>
    )
}

export default DashBoard