"use client";
import { Profile } from "@repo/core-domain/entities/Profile";
import React, { useState } from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileForm from "./ProfileForm";

function ProfileDashboard({ inititalData }: { inititalData: Profile }) {
  const [profile, setProfile] = useState(inititalData);
  const [view, setView] = useState<"display" | "form">("display");
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setView("form");
  };
  const handleCreate = () => {
    setEditingProfile(null);
    setView("form");
  };

  const handleCancel = () => {
    setView("display");
  };

  const handleSave = async (newProfile: Profile) => {
    setProfile(newProfile);
    setView("display");
  };

  return view === "display" ? (
    <ProfileDisplay
      props={{
        profile: profile,
        onCreate: () => handleCreate(),
        onEdit: (profile) => handleEdit(profile),
      }}
    />
  ) : (
    <ProfileForm
      props={{
        profile: editingProfile ?? undefined,
        onCancel: () => handleCancel(),
        onSubmit: (profile) => handleSave(profile),
      }}
    />
  );
}

export default ProfileDashboard;
