import { Experience } from "@repo/core-domain/entities/Experience";
import { Badge } from "@repo/ui/components/ui/badge";
import React from "react";
import ExperienceComponent from "./experience-component";

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-secondary text-secondary-foreground">
            Experience
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Professional Journey
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            A timeline of my professional growth and key achievements
          </p>
        </div>
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceComponent key={index} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
