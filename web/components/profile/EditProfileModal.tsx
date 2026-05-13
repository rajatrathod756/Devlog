"use client";

import {

  useState,

  useEffect

} from "react";

import {

  X,

  Camera

} from "lucide-react";

import {

  useAuthStore

} from "@/lib/stores/authStore";

import {

  userService

} from "@/lib/services/userService";


type Props = {

  open: boolean;

  onClose: () => void;
};


export default function EditProfileModal({

  open,

  onClose

}: Props) {

  const currentUser =
    useAuthStore(
      (state) => state.user
    );


  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    if (!currentUser) return;

    setName(currentUser.name || "");

    setUsername(
      currentUser.username || ""
    );

    setBio(currentUser.bio || "");

    setPreview(
      currentUser.profile_image_url || ""
    );

  }, [currentUser]);


  if (!open) return null;


  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };


  const handleSave = async () => {

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "username",
        username
      );

      formData.append(
        "bio",
        bio
      );

      if (image) {

        formData.append(
          "profile_image",
          image
        );
      }

      await userService.updateProfile(
        formData
      );

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };


  return (

    <div
      className="
        fixed
        inset-0

        z-50

        flex
        items-center
        justify-center

        bg-black/70

        backdrop-blur-sm
      "
    >

      <div
        className="
          relative

          w-full
          max-w-lg

          bg-primary-2

          rounded-3xl

          p-8

          shadow-2xl
        "
      >

        {/* CLOSE */}

        <button
          onClick={onClose}

          className="
            absolute
            top-4
            right-4

            hover:opacity-70

            transition

            cursor-pointer
          "
        >

          <X />

        </button>


        {/* TITLE */}

        <h2
          className="
            text-3xl

            font-bold

            text-secondary-1

            mb-8
          "
        >

          Edit Profile

        </h2>


        {/* IMAGE */}

        <div
          className="
            flex
            justify-center

            mb-8
          "
        >

          <label
            className="
              relative

              cursor-pointer

              group
            "
          >

            <img
              src={
                preview ||
                "https://placehold.co/140"
              }

              alt="profile"

              className="
                w-36
                h-36

                rounded-full

                object-cover

                border-4
                border-secondary-1
              "
            />

            <div
              className="
                absolute
                inset-0

                rounded-full

                bg-black/50

                opacity-0

                group-hover:opacity-100

                transition

                flex
                items-center
                justify-center
              "
            >

              <Camera
                className="
                  text-white
                "
              />

            </div>

            <input
              type="file"

              accept="image/*"

              hidden

              onChange={
                handleImageChange
              }
            />

          </label>

        </div>


        {/* FORM */}

        <div
          className="
            flex
            flex-col

            gap-5
          "
        >

          <input
            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            placeholder="Name"

            className="
              bg-primary-1

              rounded-xl

              p-4

              outline-none

              border

              border-transparent

              focus:border-secondary-1
            "
          />


          <input
            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }

            placeholder="Username"

            className="
              bg-primary-1

              rounded-xl

              p-4

              outline-none

              border

              border-transparent

              focus:border-secondary-1
            "
          />


          <textarea
            value={bio}

            onChange={(e) =>
              setBio(
                e.target.value
              )
            }

            placeholder="Bio"

            rows={4}

            className="
              bg-primary-1

              rounded-xl

              p-4

              resize-none

              outline-none

              border

              border-transparent

              focus:border-secondary-1
            "
          />

        </div>


        {/* SAVE BUTTON */}

        <button
          onClick={handleSave}

          disabled={loading}

          className="
            mt-8

            w-full

            bg-secondary-1

            text-primary-2

            py-4

            rounded-2xl

            font-bold

            text-lg

            hover:opacity-90

            transition

            cursor-pointer
          "
        >

          {loading
            ? "Saving..."
            : "Save Changes"}

        </button>

      </div>

    </div>
  );
}