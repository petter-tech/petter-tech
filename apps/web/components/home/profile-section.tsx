import { Profile } from "@repo/core-domain/entities/Profile";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Download, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProfileSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          <div className="mt-10 w-48 h-48 md:w-64 md:h-64 hidden md:block">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
              <Image
                src={profile.picture}
                alt={`Profile picture of ${profile.name}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 md:text-left">
            <Badge className="bg-secondary text-secondary-foreground">
              About Me
            </Badge>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              {profile.headline}
            </h2>
            <p className="text-muted-foreground mb-6 text-justify">
              {profile.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link href={profile.githubUrl} target="_blank">
                <Button className="rounded-full text-primary-foreground text-sm px-4">
                  <Github /> View GitHub
                </Button>
              </Link>

              <Link href={profile.cvUrl} target="_blank">
                <Button
                  className="rounded-full text-base text-sm px-4 border border-input"
                  variant="secondary"
                >
                  <Download /> Download CV
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
