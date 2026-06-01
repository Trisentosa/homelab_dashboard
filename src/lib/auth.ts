import { SessionOptions } from "iron-session";

export interface SessionData {
  authenticated?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "fallback-secret-change-in-production-32c",
  cookieName: "homelab_dashboard_session",
  cookieOptions: {
    secure: process.env.COOKIE_SECURE === "true",
    httpOnly: true,
    sameSite: "lax",
  },
};

export function getDashboardPassword(): string {
  return process.env.DASHBOARD_PASSWORD ?? "changeme";
}
