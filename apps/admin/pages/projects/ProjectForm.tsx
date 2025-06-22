"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@repo/core-domain/entities/Project";
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
import { TagsInput } from "@repo/ui/components/ui/tags-input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProjectFormProps {
  initialValues?: Project;
  onCancel: () => void;
  onSubmit: (Project: Project) => void;
}

const projectScheme = z.object({
  id: z.string().optional(),
  image: z.string().min(1, "Enter an image for the prject"),
  name: z.string().min(1, "The Name is required"),
  description: z.string().min(1, "The description is required"),
  demoUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  technologies: z.array(z.string()),
});

type ProjectSchema = z.infer<typeof projectScheme>;

const createProjectApi = async (project: Project) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  });
  return res.json();
};

const updateProjectApi = async (project: Project) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/projects/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  });
  return res.json();
};

function ProjectForm({ props }: { props: ProjectFormProps }) {
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(props.initialValues?.id);
  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectScheme),
    defaultValues: {
      id: props.initialValues?.id ?? "",
      image: props.initialValues?.image ?? "",
      name: props.initialValues?.name ?? "",
      description: props.initialValues?.description ?? "",
      demoUrl: props.initialValues?.demoUrl ?? "",
      repoUrl: props.initialValues?.repoUrl ?? "",
      technologies: props.initialValues?.technologies ?? [],
    },
  });

  async function createProject(project: Project) {
    try {
      setLoading(true);
      const result = await createProjectApi(project);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error creating the Project, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Project successfully created");
        props.onSubmit(project);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error creating the Project, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProject(project: Project) {
    try {
      setLoading(true);
      const result = await updateProjectApi(project);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error updating the Project, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Project successfully updated");
        props.onSubmit(project);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error updating the Project, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (values: ProjectSchema) => {
    const project: Project = {
      id: values.id ?? "",
      image: values.image,
      name: values.name,
      description: values.description,
      demoUrl: values.demoUrl,
      repoUrl: values.repoUrl,
      technologies: values.technologies,
    };

    if (isEdit) {
      updateProject(project);
    } else {
      createProject(project);
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
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Project Name"
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Project Description"
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
          name="demoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demo URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://..."
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
          name="repoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repo Url</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://..."
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://..."
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
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <TagsInput
                  values={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your technologies"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-6">
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {isEdit ? "Update Project" : "Create Project"}
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

export default ProjectForm;
