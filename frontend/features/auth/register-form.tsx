"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let valid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // Replace with FastAPI Register API

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      router.push("/login");
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

        {/* Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-gray-500">
            Join MedIntel AI to access Clinical Intelligence.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Full Name */}

            <div>

              <label className="font-medium">
                Full Name
              </label>

              <div className="relative mt-2">

                <User
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-11 pr-4 focus:border-teal-600 focus:ring-2 focus:ring-teal-600 outline-none"
                />

              </div>

              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName}
                </p>
              )}

            </div>

            {/* Email */}

            <div>

              <label className="font-medium">
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
                  className="w-full rounded-lg border py-3 pl-11 pr-4 focus:border-teal-600 focus:ring-2 focus:ring-teal-600 outline-none"
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

              <label className="font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <Lock
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-11 pr-12 focus:border-teal-600 focus:ring-2 focus:ring-teal-600 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3"
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

            {/* Confirm Password */}

            <div>

              <label className="font-medium">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <Lock
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-11 pr-12 focus:border-teal-600 focus:ring-2 focus:ring-teal-600 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 py-3 font-semibold text-white transition hover:bg-teal-800"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

        </div>

        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-teal-700 hover:underline"
          >
            Sign In
          </Link>
        </div>

      </div>

    </div>
  );
}