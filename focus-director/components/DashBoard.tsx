import TaskWindow from './TaskWindow'
import { TaskEntity } from './TaskCard'


const tasks: TaskEntity[] = [{
    description: "Make a plan 1 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1",
            isComplete: false,
            subTasks: [
                {
                    description: "sub of subtask 1",
                    isComplete: false
                }
            ]
        },
        {
            description: "subtask 2",
            isComplete: false
        }
    ]},
    {
    description: "Make a plan 2 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1",
            isComplete: false
        }
    ]},
    {
    description: "Make a plan 3 and a diagram for how a basic version of the App looks like", 
    isComplete: false, 
    subTasks: [
        {
            description: "subtask 1",
            isComplete: false
        }
    ]}]

const DashBoard = () => {
    return (
        <div>
            <h2>DASHBOARD</h2>
            <section> TASKS:
                <TaskWindow tasks={tasks} />
            </section>
        </div>
    )
}

export default DashBoard