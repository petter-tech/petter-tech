import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import React from "react";
import LoginForm from "../../components/login/login-form";

function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Petter Tech
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
          fill
          alt="An image of a developer setup"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default LoginPage;
