import { cookies } from "next/headers";
import React from "react";
import BannersDashboard from "../../../pages/banners/BannersDashboard";

const fetchData = async (cookies: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";
  const result = await fetch(`${baseUrl}/api/banners/list`, {
    cache: "no-store",
    headers: {
      Cookie: cookies,
    },
  });

  return result;
};

async function BannerPage() {
  const cookie = await cookies();
  const result = await fetchData(cookie.toString());
  const bannerResult = await result.json();
  if (bannerResult.type === "error") {
    return <div>There was an error loading the data</div>;
  }
  return <BannersDashboard initialData={bannerResult.data} />;
}

export default BannerPage;
