import TaskList from './TaskList'

const todos: string[] = ["Make a plan and a diagram for how a basic version of the App looks like",
    "Make components for DashBoard",
    "Integrate SASS to the project"]

const DashBoard = () => {
    return (
        <div>
            <h2>DASHBOARD</h2>
            <section> TASKS:
                <TaskList tasks={todos} />
            </section>
        </div>
    )
}

export default DashBoard