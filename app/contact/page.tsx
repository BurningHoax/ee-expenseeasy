"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/animated-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, User } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <section className="space-y-4 rounded-3xl border border-border/80 bg-card/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-10">
            <p className="inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Contact
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let’s build a better
              <span className="block bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                expense experience.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Share feedback, feature requests, or partnership ideas. We read
              every message.
            </p>
          </section>

          <Card className="rounded-3xl border border-border/80 bg-card/85 p-6 shadow-xl shadow-cyan-500/5 backdrop-blur-sm sm:p-8">
            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">
                  Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="text" className="pl-9" placeholder="Your name" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    className="pl-9"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                  <textarea
                    rows={5}
                    placeholder="Tell us what you need..."
                    className="w-full rounded-xl border border-border bg-background px-9 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="primary"
                animated
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
