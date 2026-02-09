"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function NavBar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center px-4 md:px-14">
        <div className="h-14 md:h-16 w-full shadow-sm flex mt-5 rounded-full bg-zinc-200 justify-between items-center dark:bg-zinc-800 px-2 md:px-4 py-5">
          {/* Logo and Search */}
          <div className="flex gap-2 md:gap-3 items-center flex-1">
            <Link
              href="/"
              className="rounded-3xl bg-zinc-100 text-xs md:text-sm p-2 md:p-3 px-3 md:px-5 dark:bg-zinc-900 font-semibold whitespace-nowrap"
            >
              JUMIA
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <input
                type="search"
                placeholder="Search products..."
                className="bg-white rounded-full active:outline-0 focus:outline-none p-2 px-4 dark:bg-zinc-950 w-full"
              />
              <button className="bg-orange-500 h-8 w-8 rounded-full -translate-x-9 flex items-center justify-center text-2xl text-white font-bold hover:bg-orange-600 transition">
                <CiSearch />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center justify-evenly gap-2 md:gap-3">
            {/* Mobile Search Button */}
            <button className="md:hidden bg-white h-9 w-9 rounded-full dark:bg-zinc-950 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              <CiSearch className="text-xl" />
            </button>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="bg-white h-9 w-9 md:h-10 md:w-10 rounded-full dark:bg-zinc-950 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition relative"
            >
              <FaShoppingBag className="text-base md:text-lg" />
              {/* Cart item count badge */}
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="hidden sm:flex bg-white h-9 w-9 md:h-10 md:w-10 rounded-full dark:bg-zinc-950 items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            >
              <IoHeartOutline className="text-lg md:text-xl" />
            </Link>

            {/* User Avatar/Auth Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="bg-white h-9 w-9 md:h-10 md:w-auto md:min-w-24 rounded-full dark:bg-zinc-950 flex items-center justify-center md:px-3 gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                >
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-medium truncate max-w-20">
                    {user?.username?.split(" ")[0]}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg py-2 z-20">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Wishlist
                      </Link>
                      <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          logout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-white h-9 w-9 md:h-10 md:w-auto md:min-w-24 rounded-full dark:bg-zinc-950 flex items-center justify-center md:px-4 gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                <FaUser className="text-sm md:text-base" />
                <span className="hidden md:block text-sm font-medium">
                  Sign In
                </span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden bg-white h-9 w-9 rounded-full dark:bg-zinc-950 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            >
              {showMenu ? (
                <HiX className="text-xl" />
              ) : (
                <HiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50 top-20"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="bg-white dark:bg-zinc-900 w-64 h-full ml-auto p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="flex items-center">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="bg-zinc-100 dark:bg-zinc-950 rounded-full active:outline-0 focus:outline-none p-2 px-4 w-full text-sm"
                />
              </div>

              <hr className="border-zinc-200 dark:border-zinc-700" />

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm hover:text-orange-500"
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="text-sm hover:text-orange-500"
                    onClick={() => setShowMenu(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    className="text-sm hover:text-orange-500"
                    onClick={() => setShowMenu(false)}
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/cart"
                    className="text-sm hover:text-orange-500"
                    onClick={() => setShowMenu(false)}
                  >
                    Shopping Cart
                  </Link>
                  <hr className="border-zinc-200 dark:border-zinc-700" />
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      logout();
                    }}
                    className="text-sm text-red-600 text-left hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm hover:text-orange-500"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm hover:text-orange-500"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
