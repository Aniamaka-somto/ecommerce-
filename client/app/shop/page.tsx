"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Shop() {
  const { loading } = useAuth();
  return (
    <ProtectedRoute>
      <div className="mt-2 w-100% flex">
        {loading ? (
          <div className="flex items-centergrid grid-cols-1 sm:grid-cols-3 w-full gap-4">
            <Skeleton className="h-40 w-40 rounded-md" />

            <Skeleton className="h-40 w-40 rounded-md" />
            <Skeleton className="h-40 w-40 rounded-md" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </ProtectedRoute>
  );
}
