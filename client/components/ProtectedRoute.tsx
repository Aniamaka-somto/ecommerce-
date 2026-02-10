"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isatty } from "tty";
import Router from "next/router";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (!loading && isAuthenticated && user?.role == "user") {
      router.push("/shop");
    }
  }, [isAuthenticated, loading, router, user]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center gap-4">
  //       <Skeleton className="h-12 w-12 rounded-full" />
  //       <div className="space-y-2">
  //         <Skeleton className="h-4 w-[250px]" />
  //         <Skeleton className="h-4 w-[200px]" />
  //       </div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   // router.push("/auth/login");
  //   return null;
  // }

  console.log(user?.username);

  return <>{children}</>;
}
