import TaskWindow from './TaskWindow'
import '../styles/styles.scss'

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