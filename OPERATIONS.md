# Operations Guide

## Initial Deployment

### 1. Clone the repository

```bash
git clone <this-repo> homelab-dashboard
cd homelab-dashboard
```

### 2. Set secrets

Edit `docker-compose.yml` and change the two required environment variables:

```yaml
environment:
  - DASHBOARD_PASSWORD=your-strong-password-here
  - SESSION_SECRET=your-random-32-plus-char-secret-here
```

Generate a session secret:

```bash
openssl rand -hex 32
```

### 3. Build and start

```bash
docker compose up -d --build
```

The dashboard will be available on port `3000`. Point a reverse proxy (Nginx Proxy Manager, Traefik, Caddy) at it if you want HTTPS or a custom domain.

---

## Updating the App

```bash
git pull
docker compose up -d --build
```

Your `config/services.yaml` is mounted as a volume — it is **never overwritten** by an update.

---

## Changing the Password

Update `DASHBOARD_PASSWORD` in `docker-compose.yml`, then restart:

```bash
docker compose restart dashboard
```

Active sessions will remain valid until the browser cookie expires or the user logs out. To invalidate all sessions immediately, also rotate `SESSION_SECRET` and restart.

---

## Backing Up Services Config

The only stateful file is `config/services.yaml`. Back it up however you like:

```bash
cp config/services.yaml config/services.yaml.bak
```

Or commit it to git — it contains no secrets, only service names and URLs.

---

## Running on a Different Port

Change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"   # host:container
```

---

## Running Without Docker (development)

Requirements: Node.js 20+

```bash
npm install
cp .env.example .env.local   # edit as needed
npm run dev
```

The app starts on `http://localhost:3000`. Config is read from `./config/services.yaml`.

---

## Logs

```bash
docker compose logs -f dashboard
```

---

## Health Check

Docker Compose includes a health check that hits `/api/services` every 30 seconds. Check status with:

```bash
docker compose ps
```

---

## Stopping / Removing

```bash
# Stop (preserves data)
docker compose down

# Remove image too
docker compose down --rmi local
```
