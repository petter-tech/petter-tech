"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/ui/navigation-menu";
import { Github, Menu, Twitter, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function NavMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", text: "About" },
    { href: "#experience", text: "Experience" },
    { href: "#projects", text: "Projects" },
  ];
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 bg-background border dark:border-slate-700/70 max-w-screen-md mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-3">
        <p>Petter Tech</p>
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList>
            {navLinks.map((menu, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link href={menu.href}>{menu.text}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            className="rounded-full  border border-input bg-background hidden md:flex flex-1"
            variant="secondary"
          >
            <Twitter />
          </Button>
          <Button
            size={"icon"}
            className="rounded-full  border border-input bg-background"
            variant="secondary"
          >
            <Github />
          </Button>

          <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DialogTrigger asChild className="md:hidden">
              <Button
                size="icon"
                className="rounded-full border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                variant="outline"
                aria-label="Open mobile menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="fixed inset-y-0 right-0 h-full w-3/4 sm:max-w-sm flex flex-col gap-4 p-6 pt-3 border-l bg-background shadow-lg 
  data-[state=open]:animate-in data-[state=closed]:animate-out 
  data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right 
  data-[state=closed]:duration-300 data-[state=open]:duration-500 
  !left-auto !top-auto !-translate-x-0 !-translate-y-0 !max-w-none !rounded-none"
            >
              <DialogHeader className="text-left">
                <p className="text-xl font-bold text-foreground">Petter Tech</p>
                <DialogTitle className="sr-only">
                  Main Navigation Menu
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-start space-y-6 pt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
