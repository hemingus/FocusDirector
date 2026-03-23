"use client";

import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";
import styles from './Projects.module.scss'
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import AddNewProject from "./AddNewProject";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [showAddForm, setShowAddForm] = useState(false);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  function handleCloseForm() {
    setShowAddForm(false);
  }

  return (
    <div className={styles.page}>
      <button 
        onClick={() => setShowAddForm(true)}>
        New Project
      </button>
      {projects.length === 0 ? <p>No projects found.</p> 
      :
      <div className={styles.project__container}>
        {projects.map((project) => (
          <Link href={`/dashboard/projects/${project.id}`}>
            <ProjectCard {...project}/>
          </Link>
        ))}
      </div>}
      {showAddForm && <AddNewProject onClose={handleCloseForm}/>}
    </div>
    
  );
}