import { Project } from "@repo/core-domain/entities/Project";
import { Badge } from "@repo/ui/components/ui/badge";
import React from "react";
import ProjectComponent from "./project-component";

function ProjectSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-secondary text-secondary-foreground">
            Projects
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Featured Work
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Showcasing some of my best projects and technical achievements
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectComponent project={project} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
