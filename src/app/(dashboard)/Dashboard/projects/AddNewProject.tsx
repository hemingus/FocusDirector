"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addProject } from "@/components/API_methods";

export default function AddNewProject() {
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
    }
  };

  return (
    <form
      onSubmit={handleAddProject}
      className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="project-name"
          className="mb-1 block text-sm font-medium text-gray-900"
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
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="project-description"
          className="mb-1 block text-sm font-medium text-gray-900"
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
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !name.trim()}
        className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Add Project"}
      </button>
    </form>
  );
}