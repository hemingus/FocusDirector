import Link from 'next/link'
import styles from './LandingPage.module.scss'

export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <h1>Focus Director</h1>
            <p>Welcome to Focus Director — a smarter way to move work forward. 
                Structure your tasks with clarity, break them into manageable steps, and eliminate overwhelm. 
                With an intelligent Focus Mode that guides you to the next actionable step, 
                Focus Director helps you concentrate, make steady progress, and execute with purpose.</p>
            <div className={styles.landing__cta}>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </div>
        </div>
    )
}