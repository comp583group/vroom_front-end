# 🚗 Carvantage Frontend (Next.js)

Welcome to the frontend of **Carvantage**, a modern car dealership platform built with **Next.js 14 (App Router)** and **TypeScript**.

This app connects to a Django + DRF backend and allows users to:
- Browse cars with filters and sorting
- View detailed car modals
- Submit lead forms (from contact page or car modal)
- CRM staff can login to manage inventory and leads (coming soon)

---

## 🧰 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide-react** for icons
- **Fetch API** for RESTful backend integration
- **Dockerized** (works with Docker Compose backend)

---

## ⚙️ Getting Started (Docker)

### 1. Clone the Repo

```bash
git clone https://github.com/comp583group/vroom_front-end.git
cd carvantage-frontend
```

### 2. Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Update this URL if your backend container is running on a different port or remote server.

### 3. Start Frontend (Docker Dev Mode)

```bash
docker compose up frontend
```

If you're running both frontend and backend:

```bash
docker compose up --build
```

You should now be able to visit the app at:

📍 [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
/app
  /browse-cars     → Inventory browsing with filters
  /crm             → CRM dashboard (JWT-protected)
  /contact         → Contact form
  /about           → About us
/components
  /cars            → Listing, filters, modal views
  /crm             → Lead table, filters
  /forms           → LeadForm (used in modals and contact)
  /layout          → Footer component
  /nav             → NavigationBar (responsive)
/public            → Static assets
/styles            → Tailwind or global styles
```

---

## ✨ Features

- ✅ Mobile-first, responsive UI
- ✅ Filter & sort inventory
- ✅ Car detail modal with interest form
- ✅ Contact form lead submission
- ✅ CRM internal tools (login required)
- ✅ Fully Dockerized frontend

---

## 🧪 Dev Notes

- Use `NEXT_PUBLIC_API_URL` for all API fetches.
- To test form submission, ensure backend CORS allows `http://localhost:3000`
- All public lead forms use `POST /api/leads/` endpoint (unauthenticated)

---
