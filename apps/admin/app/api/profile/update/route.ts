import { ProfileAdminRepository } from "@repo/core-data/admin/ProfileAdminRepository";
import { UpdateProfileUseCase } from "@repo/core-domain/usecases/profile/admin/UpdateProfileUseCase";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const profile = await request.json();
  const profileRepository = new ProfileAdminRepository(cookies);
  const updateProfileUseCase = new UpdateProfileUseCase(profileRepository);
  const result = await updateProfileUseCase.execute(profile);
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
