import { cookies } from "next/headers";
import React from "react";
import ProjectsDashboard from "../../../pages/projects/ProjectsDashboard";

const fetchData = async (cookies: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";
  const result = await fetch(`${baseUrl}/api/projects/list`, {
    cache: "no-store",
    headers: {
      Cookie: cookies,
    },
  });

  return result;
};

async function Projects() {
  const cookie = await cookies();
  const result = await fetchData(cookie.toString());
  const projectsResult = await result.json();
  if (projectsResult.type === "error") {
    return <div>There was an error loading the data</div>;
  }
  return <ProjectsDashboard initialData={projectsResult.data} />;
}

export default Projects;
