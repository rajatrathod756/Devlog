"use client";

import Link from "next/link";

import { Heart, MessageCircle, UserPlus } from "lucide-react";

import { useNotifications }
from "@/lib/hooks/useNotifications";


type Props = {
  open: boolean;
};


export default function NotificationsPanel({
  open
}: Props) {

  const {
    notifications,
    loading
  } = useNotifications();


  if (!open) return null;


  return (

    <div
      className="
        fixed

        top-0
        left-[260px]

        h-screen
        w-[420px]

        bg-white

        border-r

        shadow-2xl

        z-[9999]

        overflow-y-auto
      "
    >

      {/* HEADER */}

      <div
        className="
          sticky
          top-0

          bg-white

          border-b

          p-5

          flex
          items-center
          justify-between
        "
      >

        <h2
          className="
            text-xl
            font-bold
          "
        >
          Notifications
        </h2>

      </div>


      {/* LOADING */}

      {loading && (

        <div className="p-5">
          Loading...
        </div>
      )}


      {/* EMPTY */}

      {!loading &&
        notifications.length === 0 && (

        <div className="p-5 text-gray-500">
          No notifications yet
        </div>
      )}


      {/* NOTIFICATION LIST */}

      <div className="flex flex-col">

        {notifications.map((notification) => (

          <Link
            key={notification.id}

            href={
              notification.post_id
                ? `/posts/${notification.post_id}`
                : "#"
            }
          >

            <div
              className="
                flex

                gap-4

                p-4

                border-b

                hover:bg-gray-50

                transition

                cursor-pointer
              "
            >

              {/* PROFILE IMAGE */}

              <img
                src={
                  notification.actor
                    ?.profile_image_url ||

                  "https://placehold.co/50"
                }

                alt="profile"

                className="
                  w-12
                  h-12

                  rounded-full

                  object-cover
                "
              />


              {/* CONTENT */}

              <div className="flex-1">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  {/* ICON */}

                  {notification.type === "like" && (
                    <Heart
                      size={16}
                      className="text-red-500 fill-red-500"
                    />
                  )}

                  {notification.type === "comment" && (
                    <MessageCircle
                      size={16}
                      className="text-blue-500"
                    />
                  )}

                  {notification.type === "follow" && (
                    <UserPlus
                      size={16}
                      className="text-green-500"
                    />
                  )}


                  {/* USERNAME */}

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {
                      notification.actor
                        ?.username
                    }
                  </span>

                </div>


                {/* MESSAGE */}

                <p
                  className="
                    text-sm
                    text-gray-700
                    mt-1
                  "
                >

                  {notification.type === "like" &&
                    "liked your post"}

                  {notification.type === "comment" &&
                    "commented on your post"}

                  {notification.type === "follow" &&
                    "started following you"}

                </p>


                {/* TIME */}

                <p
                  className="
                    text-xs
                    text-gray-400
                    mt-2
                  "
                >

                  {new Date(
                    notification.created_at
                  ).toLocaleString()}

                </p>

              </div>


              {/* UNREAD DOT */}

              {!notification.read && (

                <div
                  className="
                    w-3
                    h-3

                    rounded-full

                    bg-blue-500

                    mt-2
                  "
                />

              )}

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}