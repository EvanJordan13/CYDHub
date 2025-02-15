# Code Your Dreams

**Table of Contents**

- [Getting Started](#️-getting-started)
- [Contributing](#️-contributing)
- [Development Guidelines](#️-development-guidelines)
- [Quick Tips](#️-quick-tips)

## Getting Started

### Prerequisites

1. Install **Node.js** and **npm**: [Download here](https://nodejs.org/en/download).

### Local setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hack4impact-uiuc/code-your-dreams.git
   cd code-your-dreams
   ```
2. Create a `.env` file from the dev channel and place it in the `code-your-dreams` folder.
   - **Important**: Do not share these credentials or commit them to GitHub. Make sure .env is listed in the .gitignore file
3. Open the project in VSCode:
   - Open the `code-your-dreams` folder in Visual Studio Code.
   - Ensure the terminal in VSCode is set to the root `code-your-dreams` folder.
4. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
5. Visit `http://localhost:3000` in your browser to view the app.

---

## Contributing

### Workflow

1. **Switch to the main branch**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a feature branch**:
   ```bash
   git checkout -b <your-initials>/<branch-name>
   ```
   > _Replace `<project_name>` with your intials (ex: ej) and `<your-branch-name>` with a name for your work, e.g., `ej/navbar`._
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push your branch**:
   ```bash
   git push
   ```
5. **Open a Pull Request (PR)**:
   - Go to the [Pull Request page](https://github.com/hack4impact-uiuc/code-your-dreams/compare) and create a new PR to merge changes from your feature branch (`<your-initials>/<branch-name>`) into the main branch for your project (`main`).
   - Provide a detailed description and request a review from Evan.
   - Once you PR is approved, you can merge it into the main branch!

## Development Guidelines

> Learn more about file and folder conventions here: [https://nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure).

### Frontend

1. **File and Folder Conventions**

   - **Pages:** Create front-end pages in `app/<path|slug>/<page>.tsx`.

   - **Navigation:** Use `<Link>` instead of the `<a>` tag for client-side navigation. Example:
     ```jsx
     <Link href="/users">Users</Link>
     ```

2. **Components**

   - **Shared Components:** General React components used across the entire site should be placed under the `components/` folder.
   - **Page-Specific Components:** Components exclusive to a specific page should be stored within the corresponding project folder, e.g., `classroom/components/*.tsx`.
   - **Naming Convention:** The component file name must match the function name inside the file. Use PascalCase (e.g., `CreateAssignmentForm.tsx`).

### Backend

1. **Routes**

   - **Route Files:** Create API routes in `app/api/<route_name>/route.tsx`. The `route_name` corresponds to the entity or object you're performing CRUD operations on (e.g., `users`).
   - **HTTP Requests:** The `route.tsx` files should contain the HTTP request logic (e.g., `GET`, `POST`, `PUT`, `DELETE`). They should not include data storage or retrieval logic.
   - **Server-Side Data Fetching:** Use `fetch()` for server-side data fetching within these route files.

2. **Database Functions**

   - **Query Files:** Write all database queries related to an entity or object in `lib/query/<object_name>.ts`. For example, `lib/query/users.ts` will contain functions for CRUD operations on the `users` table.
   - **Calling Queries:** These query functions should be called within the corresponding API routes, e.g., `app/api/users/route.tsx`.

3. **Types**
   - **Type Definitions:** Define TypeScript types that correspond to the entities in your database tables in the `types/` folder. The file name should match the route name or object name, e.g., `types/users.ts` for user-related types.

---

## Quick Tips

- Use `npm run` to view available commands.
- Install Prettier for consitent formatting
- Always pull the latest main branch before starting a new feature branch.
- Ensure you're on a feature branch before making any changes.
- Never commit directly to the main branch.
- Keep [PRs small](https://google.github.io/eng-practices/review/developer/small-cls.html) and focused on one feature. Note: The link uses CLs which are synonymous with PRs
- Commit frequently to avoid bundling unrelated changes or cluttering commit messages.

---
