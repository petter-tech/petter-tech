"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@repo/core-domain/entities/Profile";
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
import { Separator } from "@repo/ui/components/ui/separator";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { icons, Loader2, Plus, Save, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileProps {
  profile?: Profile;
  onCancel: () => void;
  onSubmit: (profile: Profile) => void;
}

const socialMediaScheme = z.object({
  name: z.string().min(1, "You have to enter a name"),
  url: z.string().min(1, "You have to enter a URL"),
  icon: z.string().min(1, "You have to choose an icon"),
});

const profileScheme = z.object({
  id: z.string().optional(),
  name: z.string().min(10, "You should write at least a title of 10 caracters"),
  headline: z.string().min(1, "The headline is required"),
  description: z.string().min(1, "The description is required"),
  githubUrl: z.string().min(1, "The Call To Action title is required"),
  cvUrl: z.string().min(1, "The Call To Action URL is required"),
  picture: z.string().min(1, "The Call To Action Icon is required"),
  socialMedias: z
    .array(socialMediaScheme)
    .min(1, "Select at least one social media"),
});

type ProfileSchema = z.infer<typeof profileScheme>;

const createProfileApi = async (profile: Profile) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/profile/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profile),
  });
  return res.json();
};

const updateProfileApi = async (profile: Profile) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/profile/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profile),
  });
  return res.json();
};

function ProfileForm({ props }: { props: ProfileProps }) {
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(props.profile?.id);
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileScheme),
    defaultValues: {
      id: props.profile?.id ?? "",
      name: props.profile?.name ?? "",
      headline: props.profile?.headline ?? "",
      description: props.profile?.description ?? "",
      githubUrl: props.profile?.githubUrl ?? "",
      cvUrl: props.profile?.cvUrl ?? "",
      picture: props.profile?.picture ?? "",
      socialMedias: props.profile?.socialMedias ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray<ProfileSchema, any>({
    control: form.control,
    name: "socialMedias",
  });

  async function createProfile(profile: Profile) {
    try {
      setLoading(true);
      const result = await createProfileApi(profile);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error creating the Profile, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Profile successfully created");
        props.onSubmit(profile);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error creating the Profile, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(profile: Profile) {
    try {
      setLoading(true);
      const result = await updateProfileApi(profile);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error updating the Profile, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Profile successfully updated");
        props.onSubmit(profile);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error updating the Profile, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (values: ProfileSchema) => {
    const Profile: Profile = {
      id: values.id ?? "",
      name: values.name,
      headline: values.headline,
      description: values.description,
      githubUrl: values.githubUrl,
      cvUrl: values.cvUrl,
      picture: values.picture,
      socialMedias: values.socialMedias,
    };

    if (isEdit) {
      updateProfile(Profile);
    } else {
      createProfile(Profile);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Petter Garcia"
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
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/JhPetter"
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
          name="cvUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/JhPetter.pdf"
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
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/JhPetter.png"
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
          name="socialMedias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Medias</FormLabel>
              <div className="flex flex-col gap-4 pt-4">
                {fields.map((fieldItem, index) => (
                  <div className="flex flex-col gap-3 " key={index}>
                    <div className="flex flex-col md:flex-row  gap-4">
                      <FormField
                        control={form.control}
                        name={`socialMedias.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/3">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Facebook"
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
                        name={`socialMedias.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/3">
                            <FormLabel>Url</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="www.facebook.com/profileID"
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
                        name={`socialMedias.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="FaFacebook"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                    <Separator />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      name: "",
                      url: "",
                      icon: "",
                    })
                  }
                >
                  <Plus /> Add Social Media
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-6">
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {isEdit ? "Update Profile" : "Create Profile"}
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

export default ProfileForm;
