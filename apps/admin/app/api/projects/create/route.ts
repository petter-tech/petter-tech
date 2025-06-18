import { ProjectAdminRepository } from "@repo/core-data/admin/ProjectAdminRepository";
import { CreateProjectUseCase } from "@repo/core-domain/usecases/project/admin/CreateProjectUseCase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const project = await request.json();
  const projectRepository = new ProjectAdminRepository(cookies);
  const createProjectUseCase = new CreateProjectUseCase(projectRepository);
  const result = await createProjectUseCase.execute(project);
  if (result.type === "error") {
    return NextResponse.json(
      { type: "error", message: result.message },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { type: "success", data: result.data },
    { status: 201 }
  );
}
