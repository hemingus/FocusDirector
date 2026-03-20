
import { toast } from "sonner";

const DEV_BASE_URL = "https://localhost:7172";
const PROD_BASE_URL = "https://hemingmusicapi.azurewebsites.net";

const BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 401) {
    console.warn("Unauthorized — redirecting to login");
    toast.warning("Unauthorized — redirecting to login");

    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }

    throw new Error("Unauthorized");
  }

  return response;
};

const handleResponse = async (response: Response, errorMessage: string) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${errorMessage}: ${errorText || response.status}`);
  }

  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response;
};

// project methods

export const addProject = async (
  name: string,
  description?: string
) => {
  const newProject = {
    name,
    description
  }
  const response = await apiFetch(`/Project`, {
    method: "POST",
    body: JSON.stringify(newProject)
  });

  return handleResponse(response, "Failed to add project.");
}

// task methods

export const addTask = async (
  text: string,
  index: number,
  projectId: string
) => {
  const newTask = {
    description: text,
    order: index,
    projectId,
  };

  const response = await apiFetch(`/TaskEntity`, {
    method: "POST",
    body: JSON.stringify(newTask),
  });

  return handleResponse(response, "Failed to add task");
};

export const deleteTask = async (taskId: string) => {
  const response = await apiFetch(`/TaskEntity/${taskId}`, {
    method: "DELETE",
  });

  return handleResponse(response, "Failed to delete task");
};

export const updateTaskStatus = async (taskId: string, status: boolean) => {
  const patchTask = {
    IsComplete: status,
  };

  const response = await apiFetch(`/TaskEntity/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(patchTask),
  });

  return handleResponse(response, "Failed to update task status");
};

export const updateTaskDescription = async (
  taskId: string,
  description: string
) => {
  const patchTask = {
    description,
  };

  const response = await apiFetch(`/TaskEntity/${taskId}/description`, {
    method: "PATCH",
    body: JSON.stringify(patchTask),
  });

  return handleResponse(response, "Failed to update task description");
};

export const updateTaskOrder = async (taskId: string, newOrder: number) => {
  const patchTask = {
    order: newOrder,
  };

  const response = await apiFetch(`/TaskEntity/${taskId}/order`, {
    method: "PATCH",
    body: JSON.stringify(patchTask),
  });

  return handleResponse(response, "Failed to update task order");
};

// subtask methods

export const addSubtask = async (
  taskId: string,
  text: string,
  order: number
) => {
  const subtaskToAdd = {
    Description: text,
    Order: order,
  };

  const response = await apiFetch(`/taskentity/${taskId}/subtask`, {
    method: "PATCH",
    body: JSON.stringify(subtaskToAdd),
  });

  return handleResponse(response, "Failed to add subtask");
};

export const deleteSubtask = async (taskId: string, subtaskId: string) => {
  const response = await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}`, {
    method: "DELETE",
  });

  return handleResponse(response, "Failed to delete subtask");
};

export const updateSubtaskStatus = async (
  taskId: string,
  subtaskId: string,
  status: boolean
) => {
  const patchSubtask = {
    IsComplete: status,
  };

  const response = await apiFetch(`/taskentity/${taskId}/subtask/${subtaskId}`, {
    method: "PATCH",
    body: JSON.stringify(patchSubtask),
  });

  return handleResponse(response, "Failed to update subtask status");
};

export const updateSubtaskDescription = async (
  taskId: string,
  subtaskId: string,
  description: string
) => {
  const patchSubtask = {
    Description: description,
  };

  const response = await apiFetch(
    `/TaskEntity/${taskId}/subtask/${subtaskId}/description`,
    {
      method: "PATCH",
      body: JSON.stringify(patchSubtask),
    }
  );

  return handleResponse(response, "Failed to update subtask description");
};

export const updateSubtaskOrder = async (
  taskId: string,
  subtaskId: string,
  order: number
) => {
  const patchSubtask = {
    Order: order,
  };

  const response = await apiFetch(
    `/TaskEntity/${taskId}/subtask/${subtaskId}/order`,
    {
      method: "PATCH",
      body: JSON.stringify(patchSubtask),
    }
  );

  return handleResponse(response, "Failed to update subtask order");
};

// step methods

export const addStep = async (
  taskId: string,
  subtaskId: string,
  text: string,
  order: number
) => {
  const stepToAdd = {
    Description: text,
    Order: order,
  };

  const response = await apiFetch(
    `/taskentity/${taskId}/subtask/${subtaskId}/step`,
    {
      method: "PATCH",
      body: JSON.stringify(stepToAdd),
    }
  );

  return handleResponse(response, "Failed to add step");
};

export const deleteStep = async (
  taskId: string,
  subtaskId: string,
  stepId: string
) => {
  const response = await apiFetch(
    `/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse(response, "Failed to delete step");
};

export const updateStepStatus = async (
  taskId: string,
  subtaskId: string,
  stepId: string,
  status: boolean
) => {
  const patchStep = {
    IsComplete: status,
  };

  const response = await apiFetch(
    `/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}`,
    {
      method: "PATCH",
      body: JSON.stringify(patchStep),
    }
  );

  return handleResponse(response, "Failed to update step status");
};

export const updateStepDescription = async (
  taskId: string,
  subtaskId: string,
  stepId: string,
  description: string
) => {
  const patchStep = {
    Description: description,
  };

  const response = await apiFetch(
    `/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}/description`,
    {
      method: "PATCH",
      body: JSON.stringify(patchStep),
    }
  );

  return handleResponse(response, "Failed to update step description");
};

export const updateStepOrder = async (
  taskId: string,
  subtaskId: string,
  stepId: string,
  order: number
) => {
  const patchStep = {
    Order: order,
  };

  const response = await apiFetch(
    `/taskentity/${taskId}/subtask/${subtaskId}/step/${stepId}/order`,
    {
      method: "PATCH",
      body: JSON.stringify(patchStep),
    }
  );

  return handleResponse(response, "Failed to update step order");
};