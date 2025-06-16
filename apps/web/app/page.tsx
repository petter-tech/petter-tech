import { Banner } from "@repo/core-domain/entities/Banner";
import HomePage from "../pages/home/HomePage";
import { Profile } from "@repo/core-domain/entities/Profile";
import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { BannerClientRepository } from "@repo/core-data/client/BannerClientRepository";
import { ProfileClientRepository } from "@repo/core-data/client/ProfileClientRepository";
import { ExperienceClientRepository } from "@repo/core-data/client/ExperienceClientRepository";
import { FetchBannersUseCase } from "@repo/core-domain/usecases/banner/client/FetchBannersUseCase";
import { FetchProfileUseCase } from "@repo/core-domain/usecases/profile/client/FetchProfileUseCase";
import { FetchExperiencesUseCase } from "@repo/core-domain/usecases/experience/client/FetchExperienceUseCase";
import { Project } from "@repo/core-domain/entities/Project";
import { ProjectClientRepository } from "@repo/core-data/client/ProjectClientRepository";
import { FetchProjectsUseCase } from "@repo/core-domain/usecases/project/client/FetchProjectsUseCase";

interface HomeProps {
  banners: Banner[];
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
}

async function fetchData(): Promise<ResultState<HomeProps>> {
  const bannerRepository = new BannerClientRepository();
  const profileRepository = new ProfileClientRepository();
  const experienceRepository = new ExperienceClientRepository();
  const projectRepository = new ProjectClientRepository();

  const fetchBannersUseCase = new FetchBannersUseCase(bannerRepository);
  const fetchProfileUseCase = new FetchProfileUseCase(profileRepository);
  const fetchExperiencesUseCase = new FetchExperiencesUseCase(
    experienceRepository
  );
  const fetchProjectsUseCase = new FetchProjectsUseCase(projectRepository);

  const [bannersResult, profileResult, experiencesResult, projectsResult] =
    await Promise.all([
      fetchBannersUseCase.execute(),
      fetchProfileUseCase.execute(),
      fetchExperiencesUseCase.execute(),
      fetchProjectsUseCase.execute(),
    ]);

  if (
    bannersResult.type === "success" &&
    profileResult.type === "success" &&
    experiencesResult.type === "success" &&
    projectsResult.type === "success"
  ) {
    return {
      type: "success",
      data: {
        banners: bannersResult.data,
        profile: profileResult.data,
        experiences: experiencesResult.data,
        projects: projectsResult.data,
      },
    };
  }

  var errorMessage = "";
  if (bannersResult.type === "error") errorMessage = bannersResult.message;
  if (profileResult.type === "error") errorMessage = profileResult.message;
  if (experiencesResult.type === "error")
    errorMessage = experiencesResult.message;
  if (projectsResult.type === "error") errorMessage = projectsResult.message;
  return { type: "error", message: errorMessage };
}

export default async function Home() {
  const result = await fetchData();
  if (result.type === "error") {
    return <div>There was an issue getting the data</div>;
  }
  return (
    <HomePage
      props={{
        banners: result.data.banners,
        profile: result.data.profile,
        experiences: result.data.experiences,
        projects: result.data.projects,
      }}
    />
  );
}
