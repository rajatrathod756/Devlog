# Parca — Developer Social Platform

Live: http://parca.in

A full-stack social media platform for developers to share their 
learning journey, projects, and progress. Built with Next.js 15, 
TypeScript, FastAPI, and PostgreSQL — deployed on AWS EC2.

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- TanStack Query — server state, infinite scroll, optimistic updates
- Zustand — client auth state
- Tailwind CSS v4

**Backend**
- FastAPI (Python)
- SQLAlchemy + Alembic — ORM and migrations
- PostgreSQL — hosted on Supabase
- Cloudinary — image storage

**Infrastructure**
- AWS EC2 t3.micro
- Caddy — reverse proxy with automatic HTTPS
- systemd — process management for both services

## Features

- JWT authentication — register and login via email or phone
- Infinite scroll feed with cursor-based pagination
- Like/unlike posts with optimistic updates and automatic rollback
- Create posts with image upload via Cloudinary
- Comment on posts
- Follow and unfollow users
- Real-time notifications via polling (likes, comments, follows)
- Search users by username or name with debounce
- Edit profile — bio, photo, contact details
- Light and dark theme with persistence

## Architecture

The frontend follows a strict layered architecture:

http.ts → api layer → service layer → custom hooks → components

Components contain zero data-fetching logic. All server state 
is managed through TanStack Query with targeted cache invalidation 
and optimistic updates. Custom hooks encapsulate all React Query 
calls keeping components focused purely on rendering.

The backend follows a repository pattern:

router → service → repository → database

## Local Setup

**Prerequisites**
- Node.js 18+
- Python 3.11+
- PostgreSQL database (or Supabase free tier)

**Frontend**
```bash
cd web
npm install
cp .env.example .env.local
# add NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

**Backend**
```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# add DATABASE_URL, SECRET_KEY, CLOUDINARY_URL
alembic upgrade head
uvicorn app.main:app --reload
```

## Environment Variables

**web/.env.example**

NEXT_PUBLIC_API_URL=http://localhost:8000

**api/.env.example**
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
CLOUDINARY_URL=cloudinary://...
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=