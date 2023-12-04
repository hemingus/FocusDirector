
type TaskCardProps = {
    description: string
}

const TaskCard: React.FC<TaskCardProps> = ({description}) => {
    return (
        <div>
            <p>{description}</p>
        </div>
    )
}

export default TaskCard