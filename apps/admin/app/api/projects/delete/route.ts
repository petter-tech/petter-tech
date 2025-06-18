import { ProjectAdminRepository } from "@repo/core-data/admin/ProjectAdminRepository";
import { DeleteProjectUseCase } from "@repo/core-domain/usecases/project/admin/DeleteProjectUseCase";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const id = await request.json();
  const projectRepository = new ProjectAdminRepository(cookies);
  const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);
  const result = await deleteProjectUseCase.execute(id);
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
