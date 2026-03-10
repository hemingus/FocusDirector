import DashBoard from './DashBoard'
import DashboardNav from './DashboardNav'


export default function Home() {
    return (
        <div className="mainPage">
            <DashboardNav />
            <DashBoard />
        </div>
    )
}