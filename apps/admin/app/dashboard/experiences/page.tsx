import { cookies } from "next/headers";
import React from "react";
import ExperiencesDashboard from "../../../pages/experiences/ExperiencesDashboard";

const fetchData = async (cookies: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";
  const result = await fetch(`${baseUrl}/api/experiences/list`, {
    cache: "no-store",
    headers: {
      Cookie: cookies,
    },
  });

  return result;
};

async function ExperiencePage() {
  const cookiesHeader = await cookies();
  const result = await fetchData(cookiesHeader.toString());
  const experiencesResult = await result.json();
  if (experiencesResult.type == "error") {
    return <div>There was an error loading the data</div>;
  }
  return <ExperiencesDashboard initialData={experiencesResult.data} />;
}

export default ExperiencePage;
