"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addProject } from "@/components/API_methods";
import styles from "./Projects.module.scss"

interface AddNewProjectProps {
  onClose: () => void
}

export default function AddNewProject({ onClose }: AddNewProjectProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setError("Project name is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await addProject(
        trimmedName,
        trimmedDescription ? trimmedDescription : undefined
      );

      setName("");
      setDescription("");

      router.refresh();
    } catch (err) {
      console.error("Failed to add project:", err);
      setError("Unable to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className={styles.newProjectWrapper}>
      
      <form
        onSubmit={handleAddProject}
        className={styles.form}
      >
        <h2>New Project</h2>
        <div className={styles.flexcol}>
          <label
            htmlFor="project-name"
          >
            Name
          </label>
          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.flexcol}>
          <label
            htmlFor="project-description"
          >
            Description <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            disabled={isSubmitting}
            rows={4}
          />
        </div>
        {error && (
          <p role="alert">
            {error}
          </p>
        )}
          <div className={styles.flexrow}>
            <button onClick={onClose}>Cancel</button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? "Creating..." : "Add Project"}
            </button>
          </div>
      </form>
    </div>
  );
}