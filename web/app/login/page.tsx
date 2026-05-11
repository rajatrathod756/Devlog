"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { Login } from "@mui/icons-material";
import { useEffect } from "react";

type LoginPayload = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await authService.login(formData);

      // assuming backend returns { access_token: "token_here" }
      // localStorage.setItem("token", response.access_token);
       localStorage.setItem("user_id", response.user_id);
      // navigate to home page
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex w-full max-w-sm flex-col gap-4 border p-6 rounded-lg border-secondary-1"
      >
        <h1 className="text-2xl font-bold text-secondary-1">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 rounded text-secondary-1"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded text-secondary-1"
        />

        <button
          type="submit"
          disabled={loading}
          className={`
            bg-black
            text-white
            p-2
            rounded
            ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-secondary-1">
          Don't have an account?
          <span
            onClick={() => router.push("/signup")}
            className="ml-1 cursor-pointer underline"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
