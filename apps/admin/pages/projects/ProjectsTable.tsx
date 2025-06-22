import { Project } from "@repo/core-domain/entities/Project";
import { Button } from "@repo/ui/components/ui/button";
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
import { ConfirmModal } from "@repo/ui/components/ui/confirm-modal";
import { toast } from "sonner";
import { Badge } from "@repo/ui/components/ui/badge";

interface ProjectTableProps {
  projects?: Project[];
  onEdit: (Project: Project) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const deleteProject = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/projects/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(id),
  });
  return res.json();
};

function ProjectTable({ props }: { props: ProjectTableProps }) {
  async function onDelete(id: string) {
    try {
      const result = await deleteProject(id);
      if (result.type === "error") {
        toast.error("There was an error", {
          description: result.message,
        });
      } else {
        toast.success("Project successfully deleted");
        props.onDelete(id);
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
        <h1 className="text-2xl font-semibold">These are the Projects</h1>
        <Button
          className="w-full sm:w-auto cursor-pointer"
          onClick={props.onCreate}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Technologies</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.description ?? "-"}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index}>{tech}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="flex justify-end items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => props.onEdit(project)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <ConfirmModal
                  title="Are you sure you want to delete this Project?"
                  description="The project will be deleted permanently"
                  onConfirm={async () => {
                    await onDelete(project.id);
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

export default ProjectTable;
