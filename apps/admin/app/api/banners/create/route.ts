import { BannerAdminRepository } from "@repo/core-data/admin/BannerAdminRepository";
import { CreateBannerUseCase } from "@repo/core-domain/usecases/banner/admin/CreateBannerUseCase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const banner = await request.json();
  const bannerRepository = new BannerAdminRepository(cookies);
  const createBannerUseCase = new CreateBannerUseCase(bannerRepository);
  const result = await createBannerUseCase.execute(banner);
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
