import { BannerAdminRepository } from "@repo/core-data/admin/BannerAdminRepository";
import { UpdateBannerUseCase } from "@repo/core-domain/usecases/banner/admin/UpdateBannerUseCase";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const banner = await request.json();
  const bannerRepository = new BannerAdminRepository(cookies);
  const updateBannerUseCase = new UpdateBannerUseCase(bannerRepository);
  const result = await updateBannerUseCase.execute(banner);
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
