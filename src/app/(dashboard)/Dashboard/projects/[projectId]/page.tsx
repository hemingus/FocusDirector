"use client";

import { useEffect, useState } from "react";
import TaskWindow from "@/components/TaskWindow";
import FocusMode from "@/components/FocusMode";

type Project = {
    id: string,
    name: string,
    description: string,
    createdAt: string
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      const { projectId } = await params;
      const response = await fetch(`https://localhost:7172/Project/${projectId}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      setProject(data);
    };

    void loadProject();
  }, [params]);

  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <>
      <header>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </header>

      <button type="button" onClick={() => setFocusMode((v) => !v)}>
        {focusMode ? "Exit Focus Mode" : "Focus Mode"}
      </button>

      <section className="taskSection">
        {focusMode ? <FocusMode /> : <TaskWindow />}
      </section>
    </>
  );
}