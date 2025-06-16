import { Experience } from "@repo/core-domain/entities/Experience";
import { Badge } from "@repo/ui/components/ui/badge";
import { Building2, Calendar } from "lucide-react";
import React from "react";
import { formatDateToMMDDYYYY } from "../../lib/utils";

function ExperienceComponent({ experience }: { experience: Experience }) {
  return (
    <div className="relative pl-8 not-last:pb-12">
      <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
        <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
            <Building2 />
          </div>
          <span className="text-lg font-semibold">{experience.company}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{experience.roleTitle}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <Calendar />
            <span>
              {formatDateToMMDDYYYY(experience.startDate)} -{" "}
              {experience.endDate
                ? formatDateToMMDDYYYY(experience.endDate)
                : "Present"}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill, index) => (
            <Badge
              className="bg-secondary text-secondary-foreground"
              key={index}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceComponent;
