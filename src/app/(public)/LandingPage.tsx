import Link from 'next/link'
import styles from './LandingPage.module.scss'

export default function LandingPage() {
    return (
        <div className={styles.landing}>
            {/* <h1>Welcome to</h1> */}
            <img src="./assets/focusdirector_logo.png" alt="focus director" />
            <div className={styles.landing__text}>
                <h1>Welcome to Focus Director</h1>
                <h2> — a smarter way to move work forward. </h2>
                    <div className={styles.landing__cta}>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                    <div className={styles.landing__message}>
                        <p>Structure your tasks with clarity, break them into manageable steps, and eliminate overwhelm. </p>
                        <p>With an intelligent Focus Mode that guides you to the next actionable step. </p>
                        <p>Focus Director helps you concentrate, make steady progress, and execute with purpose.</p>
                    </div>
            </div>
        </div>
    )
}