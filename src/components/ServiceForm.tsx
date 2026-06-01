"use client";

import { useState, useEffect } from "react";
import { Service, ServiceStatus } from "@/lib/config";

const STATUS_OPTIONS: { value: ServiceStatus; label: string }[] = [
  { value: "operating", label: "Operating" },
  { value: "deprecating", label: "Deprecating" },
  { value: "in-development", label: "In Development" },
];

type FormData = {
  name: string;
  url: string;
  description: string;
  summary: string;
  category: string;
  icon: string;
  status: ServiceStatus;
};

const EMPTY: FormData = {
  name: "",
  url: "",
  description: "",
  summary: "",
  category: "",
  icon: "",
  status: "operating",
};

interface ServiceFormProps {
  service?: Service | null;
  onSave: (data: FormData) => Promise<void>;
  onClose: () => void;
}

export default function ServiceForm({ service, onSave, onClose }: ServiceFormProps) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        url: service.url,
        description: service.description ?? "",
        summary: service.summary ?? "",
        category: service.category,
        icon: service.icon ?? "",
        status: service.status,
      });
    } else {
      setForm(EMPTY);
    }
    setError("");
  }, [service]);

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim() || !form.category.trim()) {
      setError("Name, URL, and Category are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg px-3 py-2 text-sm bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]";
  const labelClass = "block text-xs font-medium text-[var(--color-text-muted)] mb-1";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <form
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold text-[var(--color-text)]">
            {service ? "Edit Service" : "Add Service"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1 rounded-lg hover:bg-[var(--color-surface-3)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Name *</label>
              <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Nextcloud" />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>URL *</label>
              <input className={inputClass} value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="https://cloud.home.lab" />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <input className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Storage" />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.status} onChange={(e) => set("status", e.target.value as ServiceStatus)}>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>
                Icon slug{" "}
                <a href="https://selfh.st/icons" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">
                  (browse icons)
                </a>
              </label>
              <input className={inputClass} value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="nextcloud" />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Short description</label>
              <input className={inputClass} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Personal cloud storage" />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Summary (Markdown)</label>
              <textarea
                className={`${inputClass} resize-y min-h-[120px] font-mono`}
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                placeholder={"## About\nDescribe this service in detail...\n\n- Feature 1\n- Feature 2"}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[var(--color-border)] flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-3)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--color-accent)] hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
