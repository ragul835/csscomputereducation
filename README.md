# CSS Computer Education — Full-Stack Website

A modern, responsive, multi-page website for **CSS Computer Education, Tiruvannamalai** (ISO 9001:2015 Certified Institute).

**Proprietor:** D. Sharan M.Phil.(CS)

## Stack

| Layer    | Tech                              |
| -------- | --------------------------------- |
| Frontend | React 18 + Vite + React Router    |
| Backend  | Node.js + Express                 |
| Database | PostgreSQL                        |
| Styling  | Vanilla CSS (custom design system)|

## Project structure

```
css-computer-education/
├── client/           ← React frontend (Vite)
│   ├── src/
│   │   ├── pages/    ← Home, Courses, About, Contact
│   │   ├── components/ ← Layout (navbar + footer)
│   │   ├── data/     ← courses.js, site.js (editable content)
│   │   └── styles/   ← index.css
│   └── public/
│       ├── images/   ← Drop institute photos here
│       └── favicon.svg
├── server/           ← Express API + PostgreSQL
│   ├── index.js      ← API server + SPA fallback
│   ├── db-init.js    ← Creates the enquiries table
│   └── .env.example  ← Database connection config
├── manage.sh         ← Full project manager (WRT style)
└── README.md
```

## Quick start

```bash
chmod +x manage.sh
./manage.sh              # Interactive menu
# — or —
./manage.sh install      # Install all deps
./manage.sh db-setup     # Create .env + database + tables
./manage.sh dev          # Run client + server in dev mode
```

## Commands

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `install`       | Install npm deps for client & server      |
| `db-setup`      | Create .env, PostgreSQL DB and tables     |
| `build`         | Build the client for production           |
| `dev`           | Dev mode (both services, foreground)      |
| `serve`         | Build + serve production                  |
| `start`         | Start server in background                |
| `start-client`  | Start client dev server in background     |
| `start-all`     | Start both in background                  |
| `stop`          | Stop all services                         |
| `restart`       | Restart all services                      |
| `status`        | Check running services                    |
| `logs`          | Tail combined logs                        |
| `clean`         | Remove node_modules, dist, logs           |
| `pull` / `push` | Git helpers                               |

## Adding images

Drop your institute photos into `client/public/images/` and update the gallery
array in `client/src/data/site.js`.

## Contact info

- **Office:** 04175-226593
- **Cell:** 94421 42410, 95664 46593
- **Email:** csseducationtvm@gmail.com
- **Address:** 15/2A Mathalangulam Street, Near Periyar Statue Bus Stop, Tiruvannamalai - 606 601
