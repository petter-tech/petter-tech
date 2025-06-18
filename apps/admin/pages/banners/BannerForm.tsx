"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner } from "@repo/core-domain/entities/Banner";
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
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface BannerFormProps {
  initialValues?: Banner;
  onCancel: () => void;
  onSubmit: (banner: Banner) => void;
}

const bannerScheme = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(10, "You should write at least a title of 10 caracters"),
  headline: z.string().min(1, "The headline is required"),
  description: z.string().min(1, "The description is required"),
  ctaText: z.string().min(1, "The Call To Action title is required"),
  ctaUrl: z.string().min(1, "The Call To Action URL is required"),
  ctaIcon: z.string().min(1, "The Call To Action Icon is required"),
});

type BannerSchema = z.infer<typeof bannerScheme>;

const createBannerApi = async (banner: Banner) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/banners/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(banner),
  });
  return res.json();
};

const updateBannerApi = async (banner: Banner) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/banners/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(banner),
  });
  return res.json();
};

function BannerForm({ props }: { props: BannerFormProps }) {
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(props.initialValues?.id);
  const form = useForm<BannerSchema>({
    resolver: zodResolver(bannerScheme),
    defaultValues: {
      id: props.initialValues?.id ?? "",
      title: props.initialValues?.title ?? "",
      headline: props.initialValues?.headline ?? "",
      description: props.initialValues?.description ?? "",
      ctaText: props.initialValues?.ctaText ?? "",
      ctaUrl: props.initialValues?.ctaUrl ?? "",
      ctaIcon: props.initialValues?.ctaIcon ?? "",
    },
  });

  async function createBanner(banner: Banner) {
    try {
      setLoading(true);
      const result = await createBannerApi(banner);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error creating the Banner, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Banner successfully created");
        props.onSubmit(banner);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error creating the Banner, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateBanner(banner: Banner) {
    try {
      setLoading(true);
      const result = await updateBannerApi(banner);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error updating the Banner, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Banner successfully created");
        props.onSubmit(banner);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error updating the Banner, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (values: BannerSchema) => {
    const banner: Banner = {
      id: values.id ?? "",
      title: values.title,
      headline: values.headline,
      description: values.description,
      ctaText: values.ctaText,
      ctaUrl: values.ctaUrl,
      ctaIcon: values.ctaIcon,
    };

    if (isEdit) {
      updateBanner(banner);
    } else {
      createBanner(banner);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Banner Title"
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
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input
                  placeholder="Banner Headline"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Banner Description"
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
          name="ctaText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call To Action Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="See my Projects"
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
          name="ctaUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call To Action URL</FormLabel>
              <FormControl>
                <Input placeholder="#projects" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ctaIcon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call To Action Icon</FormLabel>
              <FormControl>
                <Input placeholder="ArrowDown" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4 pt-6">
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {isEdit ? "Update Banner" : "Create Banner"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => props.onCancel()}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BannerForm;
