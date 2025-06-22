import { ExperienceAdminRepository } from "@repo/core-data/admin/ExperienceAdminRepository";
import { UpdateExperienceUseCase } from "@repo/core-domain/usecases/experience/admin/UpdateExperienceUseCase";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const experience = await request.json();
  const experienceRepository = new ExperienceAdminRepository(cookies);
  const updateExperienceUseCase = new UpdateExperienceUseCase(
    experienceRepository
  );
  const result = await updateExperienceUseCase.execute(experience);
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
