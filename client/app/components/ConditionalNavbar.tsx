// app/components/ConditionalNavBar.tsx
"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function ConditionalNavBar() {
  const pathname = usePathname();

  // Hide navbar on login and signup pages
  const hideNavBar = pathname === "/auth/login" || pathname === "/auth/signup";

  if (hideNavBar) {
    return null;
  }

  return <NavBar />;
}
