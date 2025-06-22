import { BannerAdminRepository } from "@repo/core-data/admin/BannerAdminRepository";
import { FetchBannersUseCase } from "@repo/core-domain/usecases/banner/admin/FetchBannersUseCase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const bannerRepository = new BannerAdminRepository(cookies);
  const fetchBannerUseCase = new FetchBannersUseCase(bannerRepository);
  const result = await fetchBannerUseCase.execute();
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
