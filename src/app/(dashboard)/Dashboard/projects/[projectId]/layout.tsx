import { TaskDataProvider } from "@/context/TaskDataContext";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <TaskDataProvider projectId={projectId}>
      {children}
    </TaskDataProvider>
  );
}