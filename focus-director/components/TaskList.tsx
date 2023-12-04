import TaskCard from './TaskCard'

type TaskListProps = {
    tasks: string[]
}

const TaskList: React.FC<TaskListProps> = ({tasks}) => {

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li>
                        <TaskCard description={task} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList