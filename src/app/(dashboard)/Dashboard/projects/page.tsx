import AddNewProject from "./AddNewProject";
import Projects from "./Projects";
import styles from './Projects.module.scss'

export default function ProjectsPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Projects</h1>
                <AddNewProject/>
                <Projects />
        </div>
    )
}