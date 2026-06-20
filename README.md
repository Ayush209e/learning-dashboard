
## Setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev
```


```bash
npm run dev      
npm run build    
npm run start    
npm run lint     
```
## Architectural Choices

The application is built using Next.js App Router and follows a component-based architecture. The dashboard is divided into reusable layout, navigation, and Bento tile components to keep responsibilities isolated and maintainable.

Course data is stored in Supabase and fetched on the server before rendering the dashboard. This keeps database access secure, reduces client-side work, and allows the UI to render with data already available.

The layout follows a responsive Bento Grid structure that adapts across desktop, tablet, and mobile breakpoints while maintaining a single component hierarchy.

## Server / Client Component Split

Server Components are responsible for:

* Fetching course data from Supabase
* Composing the dashboard page
* Handling loading and error states

Client Components are responsible for:

* Framer Motion animations
* Sidebar navigation interactions
* Hover effects
* Animated progress indicators
* Mobile navigation state

This separation allows data fetching to remain server-side while keeping interactivity isolated to the client where it is required.

## Loading and Error Handling

Loading states are implemented using Next.js loading boundaries and skeleton components. Skeleton layouts match the final component dimensions to avoid layout shifts during hydration.

Error handling is implemented through a dedicated error boundary that provides a graceful fallback UI and allows the user to retry failed requests.

## Challenges Faced

### Combining Server Components with Framer Motion

The primary challenge was balancing server-side data fetching with client-side animations. The solution was to fetch and prepare all data in Server Components while moving animated and interactive elements into dedicated Client Components.

### Preventing Layout Shifts

To satisfy the zero-layout-shift requirement, animations use only transform and opacity properties. Progress indicators are animated using transform-based scaling rather than width changes, and skeleton loaders mirror the final layout dimensions.

### Dynamic Icon Rendering

Course icons are stored as strings in Supabase and mapped dynamically to Lucide React components. A fallback icon is provided to handle invalid or missing icon values safely.
