"use client";

import { Banner } from "@repo/core-domain/entities/Banner";
import React, { useState } from "react";
import BannerTable from "./BannerTable";
import BannerForm from "./BannerForm";

function BannersDashboard({ initialData = [] }: { initialData?: Banner[] }) {
  const [banners, setBanners] = useState(initialData);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setView("form");
  };
  const handleCreate = () => {
    setEditingBanner(null);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
  };

  const handleSave = async (newBanner: Banner) => {
    setBanners((prev) =>
      prev.some((banner) => banner.id === newBanner.id)
        ? prev.map((banner) =>
            banner.id === newBanner.id ? newBanner : banner
          )
        : [...prev, newBanner]
    );
    setView("list");
  };

  const handleDelete = async (id: string) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== id));
    setView("list");
  };

  return view === "list" ? (
    <BannerTable
      props={{
        banners: banners ?? [],
        onEdit: (banner) => handleEdit(banner),
        onCreate: () => handleCreate(),
        onDelete: (id) => handleDelete(id),
      }}
    />
  ) : (
    <BannerForm
      props={{
        initialValues: editingBanner ?? undefined,
        onCancel: () => handleCancel(),
        onSubmit: (banner) => handleSave(banner),
      }}
    />
  );
}

export default BannersDashboard;
