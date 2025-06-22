"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthAdminRepository } from "@repo/core-data/admin/AuthAdminRepository";
import { LoginUserUseCase } from "@repo/core-domain/usecases/auth/LoginUserUseCase";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const loginScheme = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, "The password is required"),
});

type LoginSchema = z.infer<typeof loginScheme>;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const authRepository = new AuthAdminRepository();
  const loginUserUseCase = new LoginUserUseCase(authRepository);

  const onSubmit = async (values: LoginSchema) => {
    try {
      setLoading(true);
      const result = await loginUserUseCase.execute(
        values.email,
        values.password
      );
      console.log("Result: ", result);
      if (result.type === "success") {
        toast.success(`Welcome to the system ${result.data.name}`);
      } else {
        toast.error("There was an error", {
          description: "Review the email or password",
        });
      }
    } catch (error) {
      toast.error("There was an error", {
        description: "Review the email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <a
                    href="#"
                    className="text-sm font-medium text-foreground hover:text-primary/90"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
