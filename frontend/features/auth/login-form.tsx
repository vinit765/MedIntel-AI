"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;

    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // TODO:
      // Replace with FastAPI Login API

      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="mb-8 flex items-center justify-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-xl font-bold text-white">
            +
          </div>

          <h1 className="text-3xl font-bold text-teal-900">
            MedIntel AI
          </h1>

        </div>

        {/* Login Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-gray-900">
            Sign In
          </h2>

          <p className="mt-2 text-gray-500">
            Access your Clinical Intelligence Platform.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Email */}

            <div>

              <label className="font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
                />

              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <div className="flex justify-between">

                <label className="font-medium text-gray-700">
                  Password
                </label>

                <Link
                  href="#"
                  className="text-sm text-teal-700 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative mt-2">

                <Lock
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-12 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Sign In Button */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Register */}

        <div className="mt-6 text-center text-gray-600">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="font-semibold text-teal-700 hover:underline"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}