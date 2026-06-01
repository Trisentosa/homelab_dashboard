# Homelab Dashboard

A self-hosted service catalog for your Proxmox cluster. Shows all your deployed services in a clean, responsive dashboard with dark/light/midnight/RGB themes.

## Features

- **Service catalog** — cards grouped by category with icon, status badge, and description
- **Detail modal** — click any card to see the full Markdown summary and an Enter button
- **4 themes** — Dark, Light, Midnight, RGB (animated glow). Preference saved in browser.
- **Admin panel** — add, edit, delete services through the UI
- **YAML config** — `config/services.yaml` is the source of truth; version-control it freely
- **Password protected** — single shared password via environment variable

---

## Quick Start (Docker)

```bash
git clone <this-repo> homelab-dashboard
cd homelab-dashboard

# Copy and edit the compose file
cp .env.example .env           # optional — you can set vars in docker-compose.yml directly

# Edit your password and secret in docker-compose.yml, then:
docker compose up -d --build
```

Open `http://<your-server-ip>:3000` and log in with your password.

---

## Adding Services

### Option A — Admin UI (recommended for quick changes)

1. Open the dashboard and click **Admin** in the top-right corner.
2. Click **Add Service** and fill in the form.
3. Save — the service appears on the dashboard immediately.

### Option B — Edit `config/services.yaml` directly

Each service entry looks like this:

```yaml
services:
  - id: nextcloud                      # auto-generated if omitted; must be unique
    name: Nextcloud
    url: https://cloud.home.lab
    description: Personal cloud storage # short text shown on the card
    summary: |                          # longer Markdown shown in the modal
      ## Nextcloud
      Self-hosted file sync. Supports WebDAV, mobile apps, and more.
    category: Storage
    icon: nextcloud                     # icon slug from selfh.st/icons (optional)
    status: operating                   # operating | deprecating | in-development
```

After saving the file, **reload the dashboard** — changes are read from disk on every request.

### Finding icon slugs

Browse [selfh.st/icons](https://selfh.st/icons) and use the slug shown (e.g. `adguard-home`, `grafana`, `portainer`). If no icon matches, the service name's first letter is used as a fallback.

---

## Service Status Values

| Value | Badge color | Meaning |
|-------|-------------|---------|
| `operating` | Green | Running normally |
| `deprecating` | Amber | Being phased out |
| `in-development` | Blue | Not yet production-ready |

---

## Themes

Click the floating button in the bottom-right corner to switch themes. Your choice is saved in your browser.

| Theme | Description |
|-------|-------------|
| Dark | Dark navy — the default |
| Light | White background |
| Midnight | Deep black with purple accents |
| RGB | Animated rainbow glow on cards |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DASHBOARD_PASSWORD` | `changeme` | Login password |
| `SESSION_SECRET` | *(insecure default)* | Cookie signing secret — **change this** |
| `CONFIG_PATH` | `/config/services.yaml` | Path to the YAML config file |
