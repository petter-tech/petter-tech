import { ExperienceAdminRepository } from "@repo/core-data/admin/ExperienceAdminRepository";
import { FetchExperiencesUseCase } from "@repo/core-domain/usecases/experience/admin/FetchExperienceUseCase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const experienceRepository = new ExperienceAdminRepository(cookies);
  const fetchExperiencesUseCase = new FetchExperiencesUseCase(
    experienceRepository
  );
  const result = await fetchExperiencesUseCase.execute();
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
