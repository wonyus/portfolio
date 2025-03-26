import { Project } from "@prisma/client";

interface BlogFormData {
  page?: string;
  limit?: string;
}

export async function findProject(formData: BlogFormData) {
  const { page = "1", limit = "10" } = formData;
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const queryParams = new URLSearchParams({
    page: parsedPage.toString(),
    limit: parsedLimit.toString(),
  });

  const res = await fetch(`/api/projects?${queryParams}`);
  return res.json() as Promise<{
    data: Project[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}
