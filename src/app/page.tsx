"use client";

import { useEffect, useState } from "react";
import { Service } from "@/lib/config";
import ServiceGrid from "@/components/ServiceGrid";
import ServiceModal from "@/components/ServiceModal";
import ThemeChanger from "@/components/ThemeChanger";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

export default function DashboardPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <h1 className="text-lg font-bold text-[var(--color-text)]">Homelab</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-[var(--color-text-muted)]">
              {services.length} service{services.length !== 1 ? "s" : ""}
            </span>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-surface-3)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ServiceGrid services={services} onCardClick={setSelected} theme={theme} />
        )}
      </main>

      {/* Service detail modal */}
      <ServiceModal service={selected} onClose={() => setSelected(null)} />

      {/* Theme changer */}
      <ThemeChanger />
    </div>
  );
}
