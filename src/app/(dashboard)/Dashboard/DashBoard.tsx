"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    function handleClick() {
        router.push("/dashboard/projects")
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Projects</button>
        </div>
    )
}