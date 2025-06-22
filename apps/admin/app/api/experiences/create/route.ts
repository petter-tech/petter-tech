import { ExperienceAdminRepository } from "@repo/core-data/admin/ExperienceAdminRepository";
import { CreateExperienceUseCase } from "@repo/core-domain/usecases/experience/admin/CreateExperienceUseCase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const experience = await request.json();
  const experienceRepository = new ExperienceAdminRepository(cookies);
  const createExperienceUseCase = new CreateExperienceUseCase(
    experienceRepository
  );
  const result = await createExperienceUseCase.execute(experience);
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
