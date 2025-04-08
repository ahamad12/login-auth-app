"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { FormError } from "@/app/components/FormError";
import { validateCredentials } from "@/app/utils/auth";
import { useAuthStore } from "@/app/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!validateCredentials(email, password)) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    login();
    document.cookie = "isLoggedIn=true";
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormError message={error} />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
