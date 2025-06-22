"use client";

import { Experience } from "@repo/core-domain/entities/Experience";
import React, { useState } from "react";
import ExperienceTable from "./ExperienceTable";
import ExperienceForm from "./ExperienceForm";

function ExperiencesDashboard({ initialData }: { initialData: Experience[] }) {
  const [experiences, setExperiences] = useState(initialData);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setView("form");
  };
  const handleCreate = () => {
    setEditingExperience(null);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
  };

  const handleSave = async (newExperience: Experience) => {
    setExperiences((prev) =>
      prev.some((experience) => experience.id === newExperience.id)
        ? prev.map((banner) =>
            banner.id === newExperience.id ? newExperience : banner
          )
        : [...prev, newExperience]
    );
    setView("list");
  };

  const handleDelete = async (id: string) => {
    setExperiences((prev) => prev.filter((experience) => experience.id !== id));
    setView("list");
  };
  return view === "list" ? (
    <ExperienceTable
      props={{
        experiences: experiences,
        onEdit: (experience) => handleEdit(experience),
        onCreate: () => handleCreate(),
        onDelete: (id) => handleDelete(id),
      }}
    />
  ) : (
    <ExperienceForm
      props={{
        initialValues: editingExperience ?? undefined,
        onCancel: () => handleCancel(),
        onSubmit: (experience) => handleSave(experience),
      }}
    />
  );
}

export default ExperiencesDashboard;
