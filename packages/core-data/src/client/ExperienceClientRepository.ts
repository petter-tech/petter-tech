import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceClientRepository } from "@repo/core-domain/repositories/client/IExperienceClientRepository";

export class ExperienceClientRepository implements IExperienceClientRepository {
  private mockExperiences: Experience[] = [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      roleTitle: "Senior Full-Stack Developer",
      startDate: new Date("2021-01-15"),
      endDate: new Date("2024-03-01"),
      description:
        "Led development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and contributed to architectural decisions for key projects.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "SQL", "REST APIs"],
    },
    {
      id: "exp-2",
      company: "Innovate Web Studio",
      roleTitle: "Software Developer",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2020-12-31"),
      description:
        "Developed and maintained client websites and web applications. Collaborated with design teams to translate UI/UX wireframes into responsive web interfaces.",
      skills: ["JavaScript", "HTML", "CSS", "jQuery", "PHP", "MySQL"],
    },
    {
      id: "exp-3",
      company: "Freelance Consultant",
      roleTitle: "Web Development Consultant",
      startDate: new Date("2024-04-01"),
      description:
        "Provide expert consulting services for small businesses, building custom web solutions and optimizing existing digital presences. Specializing in modern frontend frameworks and backend integration.",
      skills: [
        "Next.js",
        "Firebase",
        "Tailwind CSS",
        "Consulting",
        "Project Management",
      ],
    },
  ];

  async fetch(): Promise<ResultState<Experience[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      return {
        type: "success",
        data: this.mockExperiences,
      };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to fetch experiences: ${error.message}`,
      };
    }
  }
}
