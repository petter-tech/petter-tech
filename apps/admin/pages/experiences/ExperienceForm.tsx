"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Experience } from "@repo/core-domain/entities/Experience";
import { Button } from "@repo/ui/components/ui/button";
import { Calendar } from "@repo/ui/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Switch } from "@repo/ui/components/ui/switch";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { TagsInput } from "@repo/ui/components/ui/tags-input";
import { ChevronDownIcon, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

interface ExperienceProps {
  initialValues?: Experience;
  onCancel: () => void;
  onSubmit: (experience: Experience) => void;
}

const experienceScheme = z.object({
  id: z.string().optional(),
  company: z.string().min(3, "You must enter a Company Name"),
  role: z.string().min(2, "You must enter your role title for this Experience"),
  startDate: z.date(),
  currentlyWorking: z.boolean(),
  endDate: z.date().optional(),
  description: z.string().min(5, "You must describe your Experience"),
  skills: z.array(z.string()).min(2, "You must add at least two Skills"),
});

type ExperienceSchema = z.infer<typeof experienceScheme>;

const updateExperienceApi = async (experience: Experience) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/experiences/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(experience),
  });
  return res.json();
};

const createExperienceApi = async (experience: Experience) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/experiences/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(experience),
  });
  return res.json();
};

function ExperienceForm({ props }: { props: ExperienceProps }) {
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(props.initialValues?.id);
  const displayEndDate = props.initialValues?.endDate === undefined;
  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceScheme),
    defaultValues: {
      id: props.initialValues?.id ?? "",
      company: props.initialValues?.company ?? "",
      role: props.initialValues?.roleTitle ?? "",
      startDate: props.initialValues?.startDate ?? new Date(),
      endDate: props.initialValues?.endDate ?? new Date(),
      currentlyWorking: displayEndDate,
      description: props.initialValues?.description ?? "",
      skills: props.initialValues?.skills ?? [],
    },
  });

  const updateExperience = async (experience: Experience) => {
    try {
      setLoading(true);
      const result = await updateExperienceApi(experience);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error updating the Experience, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Experience successfully updated");
        props.onSubmit(experience);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error updating the Experience, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  };

  const createExperience = async (experience: Experience) => {
    try {
      setLoading(true);
      const result = await createExperienceApi(experience);
      if (result.type === "error") {
        toast.error("There was an error", {
          description:
            "There was an error creating the Experience, please inform the developer to fix the issue",
        });
      } else {
        toast.success("Experience successfully created");
        props.onSubmit(experience);
      }
    } catch (error) {
      toast.error("There was an error", {
        description:
          "There was an error creating the Experience, please inform the developer to fix the issue",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: ExperienceSchema) => {
    const experience: Experience = {
      id: values.id ?? "",
      company: values.company,
      roleTitle: values.role,
      startDate: values.startDate,
      endDate: !values.currentlyWorking ? values.endDate : undefined,
      description: values.description,
      skills: values.skills,
    };
    if (isEdit) {
      updateExperience(experience);
    } else {
      createExperience(experience);
    }
  };
  const currentlyWorking = form.watch("currentlyWorking");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Petter Tech"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full Stack Developer"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!currentlyWorking && (
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-48 justify-between font-normal"
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          captionLayout="dropdown"
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="currentlyWorking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you currently Working Here?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Here I have worked with different teams..."
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
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <TagsInput
                  values={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your skills"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4 pt-6">
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {isEdit ? "Update Experiene" : "Create Experience"}
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

export default ExperienceForm;
