"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { authService } from "@/lib/services/authService";

type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupPayload>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Redirect authenticated users

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authService.signup(formData);

      // redirect to login

      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      flex
      min-h-screen
      items-center
      justify-center
    "
    >
      <form
        onSubmit={handleSignup}
        className="
          flex
          w-full
          max-w-sm
          flex-col
          gap-4
          border
          p-6
          rounded-lg
          border-secondary-1
        "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-secondary-1
        "
        >
          Signup
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="
            border
            p-2
            rounded
            text-secondary-1
          "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="
            border
            p-2
            rounded
            text-secondary-1
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="
            border
            p-2
            rounded
            text-secondary-1
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            bg-black
            text-white
            p-2
            rounded
            cursor-pointer
          "
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p
          className="
          text-sm
          text-center
          text-secondary-1
        "
        >
          Already have an account?
          <span
            onClick={() => router.push("/login")}
            className="
              ml-1
              cursor-pointer
              underline
            "
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
