"use client";

import { Service } from "@/lib/config";

const STATUS_STYLES: Record<string, string> = {
  operating: "text-emerald-400",
  deprecating: "text-amber-400",
  "in-development": "text-blue-400",
};

const STATUS_LABELS: Record<string, string> = {
  operating: "Operating",
  deprecating: "Deprecating",
  "in-development": "In Development",
};

interface AdminTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export default function AdminTable({ services, onEdit, onDelete }: AdminTableProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--color-text-muted)]">
        <p className="text-lg">No services configured yet.</p>
        <p className="text-sm mt-1">Click &ldquo;Add Service&rdquo; to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-3)]">
            {["Name", "URL", "Category", "Status", "Actions"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {services.map((s) => (
            <tr key={s.id} className="bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] transition-colors">
              <td className="px-4 py-3 font-medium text-[var(--color-text)]">{s.name}</td>
              <td className="px-4 py-3 text-[var(--color-text-muted)] max-w-[200px] truncate">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] hover:underline">
                  {s.url}
                </a>
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">{s.category}</td>
              <td className={`px-4 py-3 font-medium ${STATUS_STYLES[s.status] ?? ""}`}>
                {STATUS_LABELS[s.status] ?? s.status}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[var(--color-surface-3)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] border border-[var(--color-border)] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
