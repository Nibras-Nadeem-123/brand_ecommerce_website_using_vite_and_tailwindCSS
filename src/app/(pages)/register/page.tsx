"use client";

import { useState } from "react";
import { Inter } from 'next/font/google';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const inter = Inter({ subsets: ['latin'] });

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="h-11 w-11 opacity-80">
              <div className="absolute w-[38.27px] h-[40.17px] bg-[#0D6EFD] rounded-lg">
                <HiOutlineShoppingBag className="absolute w-[17.45px] h-[20.64px] mt-[11.48px] ml-[11.48px] text-white" />
                <div className="bg-[#FFFFFF]/70 w-[11.5px] h-[10.79px] mt-[18.36px] ml-[14.36px]"></div>
              </div>
              <div className="w-[36.35px] h-[40.17px] ml-[7.65px] bg-[#0D6EFD33]/80 rounded-lg"></div>
            </div>
            <div className="w-19.25 h-[21.10px] ml-[9.21px] text-[#8CB7F5] text-3xl font-bold">
              <p>Brand</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className={`${inter.className} text-[24px] font-bold text-[#1C1C1C]`}>
            Create an account
          </h2>
          <p className={`${inter.className} text-[16px] text-[#8B96A5] mt-2`}>
            Sign up to start shopping
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className={`${inter.className} text-[14px] font-medium text-[#1C1C1C]`}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className={`${inter.className} text-[14px] font-medium text-[#1C1C1C]`}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className={`${inter.className} text-[14px] font-medium text-[#1C1C1C]`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`}
                placeholder="Create a password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={`${inter.className} text-[14px] font-medium text-[#1C1C1C]`}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#0D6EFD] focus:ring-[#0D6EFD] border-gray-300 rounded"
            />
            <label htmlFor="terms" className={`${inter.className} ml-2 block text-[14px] text-[#505050]`}>
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-[#0D6EFD] hover:text-[#0056b3]">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${inter.className} w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-[16px] font-medium text-white bg-[#0D6EFD] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6EFD] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className={`${inter.className} text-[14px] text-[#505050]`}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#0D6EFD] hover:text-[#0056b3]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
