"use client";

import { Service } from "@/lib/config";
import ServiceCard from "./ServiceCard";
import { Theme } from "@/hooks/useTheme";

interface ServiceGridProps {
  services: Service[];
  onCardClick: (service: Service) => void;
  theme: Theme;
}

export default function ServiceGrid({ services, onCardClick, theme }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[var(--color-text-muted)]">
        <span className="text-5xl mb-4">🏠</span>
        <p className="text-lg font-medium">No services yet</p>
        <p className="text-sm mt-1">Go to Admin to add your first service.</p>
      </div>
    );
  }

  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    const cat = s.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3 px-1">
            {cat}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {grouped[cat].map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={onCardClick}
                isRgb={theme === "rgb"}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
