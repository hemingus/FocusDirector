"use client";

import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";
import styles from './Projects.module.scss'
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.page}>
      
      {projects.length === 0 ? <p>No projects found.</p> 
      :
      <div className={styles.project__container}>
        {projects.map((project) => (
          <Link href={`/dashboard/projects/${project.id}`}>
            <ProjectCard {...project}/>
          </Link>
        ))}
      </div>}

    </div>
  );
}