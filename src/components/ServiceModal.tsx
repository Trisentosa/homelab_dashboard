"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [iconError, setIconError] = useState(false);

  useEffect(() => {
    setIconError(false);
  }, [service?.id]);

  useEffect(() => {
    if (!service) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [service, onClose]);

  if (!service) return null;

  const iconUrl = service.icon
    ? `https://cdn.jsdelivr.net/gh/selfhst/icons/svg/${service.icon}.svg`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-[var(--color-border)]">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-[var(--color-surface-3)]">
            {iconUrl && !iconError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconUrl}
                alt={service.name}
                className="w-10 h-10 object-contain"
                onError={() => setIconError(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-[var(--color-accent)]">
                {service.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-[var(--color-text)] truncate">
              {service.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs bg-[var(--color-surface-3)] text-[var(--color-text-muted)] px-2 py-0.5 rounded-full">
                {service.category}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                  STATUS_STYLES[service.status] ?? STATUS_STYLES.operating
                }`}
              >
                {STATUS_LABELS[service.status] ?? service.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-1 rounded-lg hover:bg-[var(--color-surface-3)]"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {service.description && (
            <p className="text-[var(--color-text-muted)] text-sm">{service.description}</p>
          )}

          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-3)] rounded-lg px-3 py-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="truncate">{service.url}</span>
          </div>

          {service.summary && (
            <div className="markdown-content text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {service.summary}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--color-border)]">
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-white bg-[var(--color-accent)] hover:opacity-90 transition-opacity"
            onClick={onClose}
          >
            <span>Enter</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
