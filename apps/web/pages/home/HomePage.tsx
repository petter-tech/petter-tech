"use client";

import React from "react";
import HeroSection from "../../components/home/hero-section";
import ProfileSection from "../../components/home/profile-section";
import ExperienceSection from "../../components/home/experience-section";
import ProjectSection from "../../components/home/project-section";
import { Banner } from "@repo/core-domain/entities/Banner";
import { Profile } from "@repo/core-domain/entities/Profile";
import { Experience } from "@repo/core-domain/entities/Experience";
import { Project } from "@repo/core-domain/entities/Project";

interface HomeProps {
  banners: Banner[];
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
}

const defaultBanner: Banner = {
  id: "banner-1",
  title: "Welcome to My Portfolio",
  headline: "Passionate about creating impactful web experiences",
  description:
    "With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.",
  ctaText: "View GitHub",
  ctaUrl: "https://github.com/petterjhuniorgarciainfante",
  ctaIcon: "github",
};

function HomePage({ props }: { props: HomeProps }) {
  const currentBanner =
    props.banners.length > 0 ? props.banners[0] : defaultBanner;

  return (
    <div className="space-y-10 sm:space-y-16">
      <HeroSection banner={currentBanner ?? defaultBanner} />
      <ProfileSection profile={props.profile} />
      <ExperienceSection experiences={props.experiences} />
      <ProjectSection projects={props.projects} />
    </div>
  );
}

export default HomePage;
