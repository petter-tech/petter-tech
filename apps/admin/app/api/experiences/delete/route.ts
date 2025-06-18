import { ExperienceAdminRepository } from "@repo/core-data/admin/ExperienceAdminRepository";
import { DeleteExperienceUseCase } from "@repo/core-domain/usecases/experience/admin/DeleteExperienceUseCase";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const id = await request.json();
  const experienceRepository = new ExperienceAdminRepository(cookies);
  const deleteExperienceUseCase = new DeleteExperienceUseCase(
    experienceRepository
  );
  const result = await deleteExperienceUseCase.execute(id);
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
