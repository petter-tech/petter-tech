import { Separator } from "@repo/ui/components/ui/separator";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  const currentDate = new Date();

  return (
    <footer className="mt-20">
      <div className="max-w-screen-md mx-auto">
        <div className="py-12 flex flex-col justify-start items-center">
          <p>Petter Tech</p>
          <ul className="mt-6 flex items-center gap-4 flex-wrap">
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground"
            >
              <li>About</li>
            </Link>
            <Link
              href="#experience"
              className="text-muted-foreground hover:text-foreground"
            >
              <li>Experience</li>
            </Link>
            <Link
              href="#projects"
              className="text-muted-foreground hover:text-foreground"
            >
              <li>Projects</li>
            </Link>
          </ul>
        </div>

        <Separator />
        <div className="py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          <span className="text-muted-foreground">
            © {currentDate.getFullYear()} Petter Tech. All Rights reserved.
          </span>
          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href="#" target="_blank">
              <Github />
            </Link>
            <Link href="#" target="_blank">
              <Github />
            </Link>
            <Link href="#" target="_blank">
              <Github />
            </Link>
            <Link href="#" target="_blank">
              <Github />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
