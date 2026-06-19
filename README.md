# LearnX — Next-Gen Learning Dashboard

A student dashboard prototype built for the Frontend Intern Challenge. Live course data is fetched from Supabase via Next.js Server Components, with Framer Motion handling staggered entrances, spring hovers, and sidebar layout animations.

## Stack

- **Next.js 16** (App Router)
- **Supabase** + `@supabase/ssr`
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React**

## Setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev
```

Open [http://localhost:3030/dashboard](http://localhost:3030/dashboard).

If you see a 404 or blank page, run a clean restart:

```bash
npm run dev:clean
```

### Supabase schema

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamptz default now()
);

alter table courses enable row level security;
create policy "public read" on courses for select using (true);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('UI/UX Design Fundamentals', 42, 'Palette'),
  ('Machine Learning Basics', 18, 'Brain'),
  ('DevOps & Cloud Engineering', 91, 'Rocket');
```

Icon names must match [Lucide](https://lucide.dev) icons (e.g. `Code2`, `Rocket`, `Brain`).

Optionally set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for server-only fetching when RLS is not configured.

## Architecture

### Server / client split

| Layer | Role |
|-------|------|
| `app/dashboard/page.tsx` | Async **Server Component** — fetches courses, composes layout |
| `actions/courses.ts` | Server action querying Supabase |
| `lib/supabase/server.ts` | `createServerClient` (`@supabase/ssr`) with cookie handlers |
| `"use client"` components | Framer Motion tiles, sidebar, mobile nav |

Course data is fetched on the server and passed as typed props — no client-side fetch for the main grid.

### Layout (assignment)

- **Desktop (>1024px):** Full sidebar + 12-column bento grid
- **Tablet (768–1024px):** Icon-only sidebar + 2-column grid
- **Mobile (<768px):** Bottom nav + single-column stack

### Animations (assignment constraints)

- **Staggered load** — `StaggerGroup` + `FadeIn` (`opacity` + `translateY` only)
- **Card hover** — spring scale (`stiffness: 300`, `damping: 20`) + glow via `opacity`
- **Progress bars** — `scaleX` (not `width`) to avoid layout shifts
- **Sidebar / mobile nav** — `layoutId` shared-element highlight

### Semantic HTML

`<aside>`, `<nav>`, `<main>`, `<section>`, `<article>` — no div soup for structure.

## Project structure

```
src/
├── app/dashboard/          page, loading, error
├── actions/courses.ts      server data access
├── components/
│   ├── bento/              Hero, Activity, Course tiles, grid
│   ├── layout/             Shell, sidebar, mobile nav, background
│   ├── motion/             Stagger + fade variants
│   ├── skeletons/          Pulsing loaders
│   └── ui/                 DynamicIcon
├── lib/supabase/server.ts
└── types/course.ts
```

## Challenges

1. **Zero layout shifts** — skeleton dimensions match real tiles; animations use `transform` and `opacity` only.
2. **Supabase SSR** — anon key via `@supabase/ssr`; optional service role for server reads when RLS is not configured.
3. **Responsive bento** — column spans adjust per breakpoint while keeping a single component tree.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
```
