"use client";

import { Experience } from "@repo/core-domain/entities/Experience";
import { Button } from "@repo/ui/components/ui/button";
import { ConfirmModal } from "@repo/ui/components/ui/confirm-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ExperienceProps {
  experiences?: Experience[];
  onEdit: (experience: Experience) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const deleteExperience = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/experiences/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(id),
  });
  return res.json();
};

function ExperienceTable({ props }: { props: ExperienceProps }) {
  async function onDelete(id: string) {
    try {
      const result = await deleteExperience(id);
      if (result.type === "success") {
        toast.success("The experience was successfully deleted");
        props.onDelete(id);
      } else {
        toast.error("There was an error deleting the experience", {
          description: "Try it later.",
        });
      }
    } catch (error) {
      toast.error("There was an error", {
        description: "Try it later.",
      });
    }
  }
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-semibold">These are the Experiences</h1>
        <Button
          className="w-full sm:w-auto cursor-pointer"
          onClick={props.onCreate}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Experience
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.experiences?.map((experience) => (
            <TableRow key={experience.id}>
              <TableCell className="font-medium">
                {experience.company}
              </TableCell>
              <TableCell>{experience.roleTitle ?? "-"}</TableCell>
              <TableCell className="line-clamp-2 max-w-xs text-ellipsis">
                {experience.description ?? "-"}
              </TableCell>
              <TableCell className="flex justify-end items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => props.onEdit(experience)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <ConfirmModal
                  title="Are you sure you want to delete the Experience?"
                  description="The experience will be deleted permanently"
                  onConfirm={async () => {
                    await onDelete(experience.id);
                  }}
                  triggerIcon={<Trash2 />}
                  confirmVariant="destructive"
                  triggerVariant="destructive"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExperienceTable;
