"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import ProfileStats from "./ProfileStats";

import { userService } from "@/lib/services/userService";

import type { ProfileResponse } from "@/types/profile";

export default function ProfileCard() {
  const router = useRouter();

  const pathname = usePathname();

  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile(localStorage.getItem("user_id"));

        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-6">Failed to load profile</div>;
  }

  const cardContent = (
    <div
      className="
        relative

        bg-primary-2
        text-secondary-1

        p-6

        rounded-2xl

        shadow-lg

        flex
        flex-col
        items-center

        gap-4
      "
    >
      {/* BACK BUTTON */}

      {pathname === "/profile" && (
        <button
          onClick={() => router.back()}
          title="Go Back"
          className="
            absolute
            top-4
            left-4

            p-2

            rounded-full

            hover:bg-white/10

            transition

            cursor-pointer
          "
        >
          <ArrowLeft size={22} />
        </button>
      )}

      {/* PROFILE IMAGE */}

      <img
        src={profile.profile_image_url || "https://placehold.co/120"}
        alt="profile"
        loading="eager"
        className="
          w-28
          h-28

          rounded-full

          object-cover

          border-4
          border-secondary-1
        "
      />

      {/* NAME + USERNAME */}

      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {profile.name || profile.username}
        </h2>

        <p
          className="
            text-gray-400
            text-sm
            mt-1
          "
        >
          @{profile.username}
        </p>
      </div>

      {/* BIO */}

      <p
        className="
    text-center

    text-base

    text-secondary-1

    opacity-80

    leading-relaxed

    max-w-md

    px-4
  "
      >
        {profile.bio || "No bio available"}
      </p>

      {/* STATS */}

      <ProfileStats
        posts={profile.posts_count}
        followers={profile.followers_count}
        following={profile.following_count}
      />

      {/* FOLLOW BUTTON */}

      <button
        className="
          mt-4

          bg-secondary-1
          text-primary-2

          px-6
          py-2

          rounded-full

          font-semibold

          hover:opacity-80

          transition

          cursor-pointer
        "
      >
        {profile.is_following
          ? "Following"
          : profile.follows_you
            ? "Follow Back"
            : "Follow"}
      </button>
    </div>
  );

  // HOME PAGE → clickable
  if (pathname !== "/profile") {
    return <Link href="/profile">{cardContent}</Link>;
  }

  // PROFILE PAGE → not clickable
  return cardContent;
}
