"use client";

import { Profile } from "@repo/core-domain/entities/Profile";
import { Button } from "@repo/ui/components/ui/button";
import { Edit, Plus } from "lucide-react";
import React from "react";
import ProfileSection from "../../components/profile/profile-section";

interface ProfileProps {
  profile?: Profile;
  onEdit: (profile: Profile) => void;
  onCreate: () => void;
}

function ProfileDisplay({ props }: { props: ProfileProps }) {
  const profile = props.profile;
  return (
    <div className="p-4 space-y-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-row gap-2">
          {profile !== undefined ? (
            <Button
              variant="secondary"
              className="w-full sm:w-auto cursor-pointer"
              onClick={() => props.onEdit(profile)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <Button
              className="w-full sm:w-auto cursor-pointer"
              onClick={props.onCreate}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Profile
            </Button>
          )}
        </div>
      </div>
      {profile !== undefined ? (
        <ProfileSection profile={profile} />
      ) : (
        <div>You must create your profile </div>
      )}
    </div>
  );
}

export default ProfileDisplay;
