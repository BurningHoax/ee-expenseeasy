"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/animated-button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LockKeyhole, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || isLoggedIn) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials. Use any email with password (6+ chars).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-border/80 bg-card/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome Back
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Sign in and continue
            <span className="block bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              tracking smarter.
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Access your dashboard and split settlements with your saved data.
          </p>
        </section>

        <Card className="w-full rounded-3xl border border-border/80 bg-card/85 p-8 shadow-xl shadow-cyan-500/5 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-2xl bg-primary/15 p-3 text-primary">
              <LockKeyhole className="h-6 w-6" />
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            ExpenseEasy
          </h2>
          <p className="mb-8 mt-2 text-center text-muted-foreground">
            Sign in to access protected pages
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (6+ chars)"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-300/50 bg-red-400/10 p-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              variant="primary"
              animated
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-primary/25 bg-primary/10 p-4">
            <p className="text-center text-xs text-foreground/85">
              <strong>Demo:</strong> Use any email and a password with at least
              6 characters.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
