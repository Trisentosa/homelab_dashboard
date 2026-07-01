import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type ServiceStatus = "operating" | "deprecating" | "in-development";

export interface Service {
  id: string;
  name: string;
  url: string;
  local_url?: string;
  description: string;
  summary?: string;
  category: string;
  icon?: string;
  status: ServiceStatus;
}

export interface Config {
  title: string;
  services: Service[];
}

const CONFIG_PATH =
  process.env.CONFIG_PATH || path.join(process.cwd(), "config", "services.yaml");

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureUnique(id: string, existing: Service[]): string {
  const ids = new Set(existing.map((s) => s.id));
  if (!ids.has(id)) return id;
  let i = 2;
  while (ids.has(`${id}-${i}`)) i++;
  return `${id}-${i}`;
}

export function readConfig(): Config {
  if (!fs.existsSync(CONFIG_PATH)) {
    return { title: "My Homelab", services: [] };
  }
  const raw = fs.readFileSync(CONFIG_PATH, "utf8");
  const parsed = yaml.load(raw) as Config;
  return {
    title: parsed.title ?? "My Homelab",
    services: parsed.services ?? [],
  };
}

function writeConfig(config: Config): void {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const out = yaml.dump(config, { lineWidth: -1 });
  fs.writeFileSync(CONFIG_PATH, out, "utf8");
  console.log("[config] wrote", CONFIG_PATH, `(${out.length} bytes)`);
}

export function getServices(): Service[] {
  return readConfig().services;
}

export function addService(data: Omit<Service, "id">): Service {
  const config = readConfig();
  const id = ensureUnique(slugify(data.name), config.services);
  const service: Service = { id, ...data };
  config.services.push(service);
  writeConfig(config);
  return service;
}

export function updateService(id: string, data: Partial<Omit<Service, "id">>): Service | null {
  const config = readConfig();
  const idx = config.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  config.services[idx] = { ...config.services[idx], ...data };
  writeConfig(config);
  return config.services[idx];
}

export function deleteService(id: string): boolean {
  const config = readConfig();
  const before = config.services.length;
  config.services = config.services.filter((s) => s.id !== id);
  if (config.services.length === before) return false;
  writeConfig(config);
  return true;
}
