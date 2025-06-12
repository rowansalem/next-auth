# User CRUD Admin Panel (Next.js, MUI, React Query, i18n)

A full-featured user management/admin panel built with Next.js 14, Material-UI (MUI), React Query, React Hook Form, Yup validation, and full internationalization (i18n) support. This project demonstrates best practices for building scalable, modern, and accessible admin interfaces.

---

## Backend API

This project requires a backend API. You can find the recommended backend implementation (NestJS) here:

👉 [NestJS Auth Backend Repository](https://github.com/rowansalem/nest-auth)

Please follow the backend's README for setup and API documentation.

---

## Features

- **User Authentication**
  - Sign up, sign in, sign out
  - Forgot password & password reset
  - Email confirmation (initial and new email)
  - JWT-based authentication with refresh tokens

- **User Management (Admin Panel)**
  - List users with infinite scroll and sorting
  - Filter users by role
  - Create, edit, and delete users
  - Change user password (admin)
  - Upload and manage user avatars
  - Role-based access control (Admin/User)

- **Profile Management**
  - Edit profile info (name, avatar)
  - Change email (with confirmation)
  - Change password

- **Internationalization (i18n)**
  - Fully localized UI (English & Arabic by default)
  - Language switcher
  - Server-side and client-side translations

- **UI/UX**
  - Material-UI (MUI) components and theming
  - Responsive design
  - Snackbar notifications
  - Confirm dialogs for destructive actions
  - Leave-page protection for unsaved changes
  - Accessible forms with validation and error messages

- **Developer Experience**
  - TypeScript throughout
  - ESLint and Prettier
  - Husky pre-commit hook for linting
  - Modular, scalable folder structure
  - React Query Devtools

---

## Getting Started

### 1. **Clone the Repository**

```bash
git clone <your-repo-url>
cd next-auth
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Environment Variables**

Copy the example environment file and fill in your API endpoints and secrets:

```bash
cp example.env.local .env
```

Edit `.env` as needed.

### 4. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

---

## Project Structure

```
client/
  src/
    app/                # Next.js app directory (routes, pages, layouts)
      [language]/       # Language-specific routes (i18n)
        admin-panel/    # Admin panel (user CRUD)
        ...             # Auth, profile, etc.
    components/         # Reusable UI components
    services/           # API, auth, helpers, i18n, react-query, etc.
  public/               # Static assets
  package.json          # Project metadata and scripts
  ...
```

---

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint

---

## Internationalization (i18n)

- Add new languages by creating a folder in `src/services/i18n/locales/` (e.g., `fr/` for French) and providing the necessary JSON translation files.
- The app will auto-detect and serve the correct language based on the URL and user preferences.

---

## Customization

- **Theming:** Edit `src/components/theme/theme-provider.tsx` for custom MUI themes.
- **API Endpoints:** Update API URLs in `src/services/api/config.ts` as needed.
- **Roles:** Adjust roles in `src/services/api/types/role.ts`.

---

## Linting & Pre-commit

- ESLint is configured with Next.js core web vitals.
- Husky runs `npm run lint` before every commit.

---

## Credits

- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [i18next](https://www.i18next.com/)

