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

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Projects</h1>
      <div className={styles.project__container}>
        

        {projects.map((project) => (
          <Link href={`/dashboard/projects/${project.id}`}>
            <ProjectCard {...project}/>
          </Link>
        ))}
      </div>
    </div>
  );
}