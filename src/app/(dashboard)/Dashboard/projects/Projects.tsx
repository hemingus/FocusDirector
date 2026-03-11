"use client";

import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";

export default function Projects() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <div>
      <h1>Projects</h1>

      {projects.map((project) => (
        <div key={project.id}>
          <Link href={`/dashboard/projects/${project.id}`}>
            {project.name}
          </Link>
        </div>
      ))}
    </div>
  );
}