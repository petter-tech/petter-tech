"use client";

import { Project } from "@repo/core-domain/entities/Project";
import React, { useState } from "react";
import ProjectTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";

function ProjectsDashboard({ initialData = [] }: { initialData?: Project[] }) {
  const [projects, setProjects] = useState(initialData);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setView("form");
  };
  const handleCreate = () => {
    setEditingProject(null);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
  };

  const handleSave = async (newProject: Project) => {
    setProjects((prev) =>
      prev.some((project) => project.id === newProject.id)
        ? prev.map((project) =>
            project.id === newProject.id ? newProject : project
          )
        : [...prev, newProject]
    );
    setView("list");
  };

  const handleDelete = async (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setView("list");
  };

  return view === "list" ? (
    <ProjectTable
      props={{
        projects: projects ?? [],
        onEdit: (project) => handleEdit(project),
        onCreate: () => handleCreate(),
        onDelete: (id) => handleDelete(id),
      }}
    />
  ) : (
    <ProjectForm
      props={{
        initialValues: editingProject ?? undefined,
        onCancel: () => handleCancel(),
        onSubmit: (project) => handleSave(project),
      }}
    />
  );
}

export default ProjectsDashboard;
