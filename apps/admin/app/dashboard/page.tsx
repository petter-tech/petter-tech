import { cookies } from "next/headers";
import React from "react";
import ProfileDashboard from "../../pages/profile/ProfileDashboard";

const fetchData = async (cookies: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";
  const result = await fetch(`${baseUrl}/api/profile/get`, {
    cache: "no-store",
    headers: {
      Cookie: cookies,
    },
  });

  return result;
};

async function ProfilePage() {
  const cookie = await cookies();
  const result = await fetchData(cookie.toString());
  const projectsResult = await result.json();
  if (projectsResult.type === "error") {
    return <div>There was an error loading the data</div>;
  }
  return <ProfileDashboard inititalData={projectsResult.data} />;
}

export default ProfilePage;
