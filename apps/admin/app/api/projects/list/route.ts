import { ProjectAdminRepository } from "@repo/core-data/admin/ProjectAdminRepository";
import { FetchProjectsUseCase } from "@repo/core-domain/usecases/project/admin/FetchProjectsUseCase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const projectRepository = new ProjectAdminRepository(cookies);
  const fetchProjectUseCase = new FetchProjectsUseCase(projectRepository);
  const result = await fetchProjectUseCase.execute();
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
