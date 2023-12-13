import TaskWindow from './TaskWindow'
import { Task } from './TaskTypes'
import '../styles/styles.scss'


const tasks: Task[] = [{
    description: "Make a plan 1 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1",
            isComplete: false,
            steps: [
                {
                    description: "step 1",
                    isComplete: false
                },
                {
                    description: "step 2",
                    isComplete: false
                },
                {
                    description: "step 3",
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
                    description: "step 1",
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
            description: "subtask 1",
            isComplete: false,
            steps: []
        }
    ]},
    {
    description: "Make a plan 2 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: []
    },
    {
    description: "Make a plan 3 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1",
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
                <TaskWindow tasks={tasks} />
                </div>
            </section>
        </div>
    )
}

export default DashBoard