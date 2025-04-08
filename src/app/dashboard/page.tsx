"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export default function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    document.cookie = "isLoggedIn=false";
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold mb-4">Welcome, you’re logged in.</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
