import { ProfileAdminRepository } from "@repo/core-data/admin/ProfileAdminRepository";
import { FetchProfileUseCase } from "@repo/core-domain/usecases/profile/admin/FetchProfileUseCase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const profileRepository = new ProfileAdminRepository(cookies);
  const fetchProfileUseCase = new FetchProfileUseCase(profileRepository);
  const result = await fetchProfileUseCase.execute();
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
