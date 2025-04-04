"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="navbar bg-[#0E0016] shadow-sm outline-2 relative">
      <div className="navbar-start">
        {/* Menu Button */}
        <button onClick={() => setIsOpen(true)} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 md:h-10 w-6 md:w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
      </div>
      <a href="/" className="h-10 w-40 md:w-60 navbar-center gap-0">
        <img src="https://i.ibb.co.com/CKQfh3SY/Anizen-Logo.png" alt="" />
      </a>
      <div className="navbar-end mr-2 md:mr-6">
        <a href="/contact" className="bg-[#161A20] text-white p-2 rounded">
          Contact Us
        </a>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-black text-xl"
        >
          ✖
        </button>

        {/* Sidebar Menu */}
        <ul className="menu p-4 text-black">
          {user?.role === "super-admin" ||
          user?.role === "admin" ||
          user?.role === "moderator" ? (
            <details className="relative">
              <summary className="text-xl mb-5 cursor-pointer list-none">
                Dashboard
              </summary>

              <ul className="rounded-t-none p-2 mb-5">
                {user?.role === "super-admin" ? (
                  <li onClick={() => setIsOpen(false)}>
                    <Link href="/admin/add-user">Add User</Link>
                  </li>
                ) : null}

                <li onClick={() => setIsOpen(false)}>
                  <Link href="/admin/add-anime">Add Anime</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link href="/admin/add-schedule">Add Schedule</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link href="/admin/view-anime">View Anime</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link href="/admin/view-visitor">View Visitor</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <button onClick={handleLogout}>LogOut</button>
                </li>
              </ul>
            </details>
          ) : null}
          <h1 className="text-gray-300 text-2xl font-bold mb-3">Categories</h1>

          <li onClick={() => setIsOpen(false)} className="hover:text-red-500">
            <a href="/animes">Anime</a>
          </li>
          <li onClick={() => setIsOpen(false)} className="hover:text-red-500">
            <a>Movies</a>
          </li>
          <li onClick={() => setIsOpen(false)} className="hover:text-red-500">
            <a>Animation & Cartoon</a>
          </li>
          <li onClick={() => setIsOpen(false)} className="hover:text-red-500">
            <a>Series</a>
          </li>
          <li onClick={() => setIsOpen(false)} className="hover:text-red-500">
            <a>Tv Shows</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
