import { Project } from "@repo/core-domain/entities/Project";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import React from "react";

function ProjectComponent({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      <div className="relative h-64 overflow-hidden bg-accent">
        <Image
          src={project.image}
          alt={`Image of project ${project.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <Badge
              className="bg-secondary text-secondary-foreground"
              key={index}
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          {project.demoUrl && (
            <Button className="rounded-full px-4">
              <ExternalLink /> Live Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button
              className="rounded-full px-4 border border-input"
              variant="secondary"
            >
              <Github /> View Code
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectComponent;
