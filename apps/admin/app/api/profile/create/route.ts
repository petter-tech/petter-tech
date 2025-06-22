import { ProfileAdminRepository } from "@repo/core-data/admin/ProfileAdminRepository";
import { CreateProfileUseCase } from "@repo/core-domain/usecases/profile/admin/CreateProfileUseCase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const profile = await request.json();
  const profileAdminRepository = new ProfileAdminRepository(cookies);
  const createProfileUseCase = new CreateProfileUseCase(profileAdminRepository);
  const result = await createProfileUseCase.execute(profile);
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
