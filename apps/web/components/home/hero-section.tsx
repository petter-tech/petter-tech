import { Banner } from "@repo/core-domain/entities/Banner";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { CircleArrowDown, Zap } from "lucide-react";
import React from "react";

function HeroSection({ banner }: { banner: Banner }) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden"
    >
      <div className="relative z-[1] text-center max-w-screen-md">
        <Badge>
          <Zap /> {banner.title}
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          {banner.headline}
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">{banner.description}</p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button className="rounded-full text-base">
            {banner.ctaText} <CircleArrowDown />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
