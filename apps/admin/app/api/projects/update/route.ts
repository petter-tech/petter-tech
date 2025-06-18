import { ProjectAdminRepository } from "@repo/core-data/admin/ProjectAdminRepository";
import { UpdateProjectUseCase } from "@repo/core-domain/usecases/project/admin/UpdateProjectUseCase";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const project = await request.json();
  const projectRepository = new ProjectAdminRepository(cookies);
  const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
  const result = await updateProjectUseCase.execute(project);
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
