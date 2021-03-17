import { useParams } from "react-router-dom";

export const useProjectIdParam = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return projectId;
};
