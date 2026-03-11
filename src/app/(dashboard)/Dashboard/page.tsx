import Dashboard from './Dashboard'
import DashboardNav from './DashboardNav'


export default function Home() {
    return (
        <div className="mainPage">
            <DashboardNav />
            <Dashboard />
        </div>
    )
}