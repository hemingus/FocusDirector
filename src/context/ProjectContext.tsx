"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { addProject, deleteProject } from "@/components/API_methods";

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type ProjectForCreation = {
  name: string;
  description?: string;
}

type ProjectContextType = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  activeProjectId: string | null;
  activeProject: Project | null;
  setActiveProjectId: (projectId: string | null) => void;
  addNewProject: (project: ProjectForCreation) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
  children: ReactNode;
};

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const addNewProject = async ({name, description}: ProjectForCreation) => {
    await addProject(name, description);
  }

  const removeProject = async (projectId: string) => {
    await deleteProject(projectId);
  }

  const refreshProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://localhost:7172/Project", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch projects: ${response.status} ${text}`);
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Projects response is not an array");
      }

      const parsedProjects = data as Project[];
      setProjects(parsedProjects);

      setActiveProjectId((current) => {
        if (current && parsedProjects.some((project) => project.id === current)) {
          return current;
        }

        return parsedProjects.length > 0 ? parsedProjects[0].id : null;
      });
    } catch (err) {
      console.error(err);
      setProjects([]);
      setActiveProjectId(null);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshProjects();
  }, [refreshProjects]);

  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    return projects.find((project) => project.id === activeProjectId) ?? null;
  }, [projects, activeProjectId]);

  const value = useMemo<ProjectContextType>(
    () => ({
      projects,
      loading,
      error,
      activeProjectId,
      activeProject,
      setActiveProjectId,
      addNewProject,
      removeProject,
      refreshProjects,
    }),
    [projects, loading, error, activeProjectId, activeProject, refreshProjects]
  );

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }

  return context;
}