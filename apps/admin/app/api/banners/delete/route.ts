import { BannerAdminRepository } from "@repo/core-data/admin/BannerAdminRepository";
import { DeleteBannerUseCase } from "@repo/core-domain/usecases/banner/admin/DeleteBannerUseCase";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const id = await request.json();
  const bannerRepository = new BannerAdminRepository(cookies);
  const deleteBannerUseCase = new DeleteBannerUseCase(bannerRepository);
  const result = await deleteBannerUseCase.execute(id);
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
