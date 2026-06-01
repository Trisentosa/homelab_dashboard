"use client";

import { useState } from "react";
import { Service } from "@/lib/config";

const STATUS_STYLES: Record<string, string> = {
  operating: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  deprecating: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "in-development": "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const STATUS_LABELS: Record<string, string> = {
  operating: "Operating",
  deprecating: "Deprecating",
  "in-development": "In Development",
};

interface ServiceCardProps {
  service: Service;
  onClick: (service: Service) => void;
  isRgb?: boolean;
}

export default function ServiceCard({ service, onClick, isRgb }: ServiceCardProps) {
  const [iconError, setIconError] = useState(false);

  const iconUrl = service.icon
    ? `https://cdn.jsdelivr.net/gh/selfhst/icons/svg/${service.icon}.svg`
    : null;

  return (
    <button
      onClick={() => onClick(service)}
      className={[
        "w-full text-left rounded-xl p-4 border transition-all duration-200",
        "hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]",
        "bg-[var(--color-surface-2)] border-[var(--color-border)]",
        "hover:border-[var(--color-accent)]",
        isRgb ? "rgb-card" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-[var(--color-surface-3)]">
          {iconUrl && !iconError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconUrl}
              alt={service.name}
              className="w-7 h-7 object-contain"
              onError={() => setIconError(true)}
            />
          ) : (
            <span className="text-lg font-bold text-[var(--color-accent)]">
              {service.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-[var(--color-text)] truncate">
              {service.name}
            </h3>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${
                STATUS_STYLES[service.status] ?? STATUS_STYLES.operating
              }`}
            >
              {STATUS_LABELS[service.status] ?? service.status}
            </span>
          </div>
          {service.description && (
            <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
              {service.description}
            </p>
          )}
          <p className="text-xs text-[var(--color-text-muted)] mt-1 truncate opacity-60">
            {service.url}
          </p>
        </div>
      </div>
    </button>
  );
}
