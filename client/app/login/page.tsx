"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full  rounded-2xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
            Sign in to your account
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-6 py-4 bg-zinc-200 dark:bg-zinc-900 rounded-full  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-6 py-4 bg-zinc-200 dark:bg-zinc-900 rounded-full  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
