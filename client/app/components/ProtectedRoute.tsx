"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isatty } from "tty";
import Router from "next/router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (!loading && isAuthenticated) {
      router.push("/shop");
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   // router.push("/auth/login");
  //   return null;
  // }
  console.log(user?.username);

  return <>{children}</>;
}
