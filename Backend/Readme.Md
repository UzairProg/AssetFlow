# AssetFlow Backend 🚀

The backend api for the **AssetFlow** Enterprise Asset & Resource Management System. Built using Node.js, Express, and Prisma ORM with PostgreSQL.

Enforces a minimalist, production-like, and highly performant architecture.

---

## 🛠️ Technology Stack

*   **Runtime:** Node.js (CommonJS)
*   **Framework:** Express.js
*   **Database ORM:** Prisma ORM
*   **Database:** PostgreSQL
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs (password hashing)
*   **Validation:** Zod schemas

---

## 📁 Project Structure

```text
Backend/
├── prisma/
│   ├── schema.prisma   # PostgreSQL database models & relations
│   └── seed.js         # Auto-populates default admin account
├── src/
│   ├── db.js           # Prisma client client instantiation
│   ├── middleware.js   # JWT, RBAC, Zod validation & Error middlewares
│   ├── routes.js       # API routes, request schemas & controller logic
│   └── server.js       # App entry point & middleware bootstrapping
├── .env                # App environment configuration
├── package.json        # NPM scripts & dependencies
└── Readme.Md           # Documentation
```

---

## ⚙️ Prerequisites & Setup

### 1. Requirements
Ensure you have the following installed locally:
*   [Node.js](https://nodejs.org/) (v18+)
*   [PostgreSQL](https://www.postgresql.org/) (running on default port `5432`)

### 2. Installation
Navigate to the `Backend/` directory and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the `Backend/` root folder (or use the existing one) with these parameters:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/assetflow?schema=public"
JWT_SECRET="super-secret-key-for-assetflow-hackathon"
PORT=5000
```
*Modify `DATABASE_URL` as needed to match your local PostgreSQL superuser credentials.*

### 4. Database Setup & Seeding
Establish database tables and run the default seed configuration (creates the `ADMIN` account):
```bash
npm run db:migrate
```

### 5. Running the Application
Start the server locally:
```bash
npm run start
```
The server will boot and run on `http://localhost:5000`.

---

## 🔒 Role-Based Access Control (RBAC)

The system supports four distinct roles:
1.  **ADMIN**: Full permissions. Can manage departments, categories, directory, promotion, and assets.
2.  **ASSET_MANAGER**: Can manage categories and register/edit assets.
3.  **DEPARTMENT_HEAD**: Can update asset lifecycle status.
4.  **EMPLOYEE**: Default role. View-only access to directories and personal assets.

> [!NOTE]
> *   Sign-up always creates an `EMPLOYEE` account. Selected roles are ignored during sign-up.
> *   `ADMIN` accounts must promote users to higher roles via the promotion API.

---

## 🔗 API Documentation Reference

All endpoints return JSON. Headers require `Authorization: Bearer <JWT_TOKEN>` on protected endpoints.

### Authentication & Directory
*   `POST /api/auth/signup`: Registers a new user.
*   `POST /api/auth/login`: Logs in a user, returning a JWT token and user profile.
*   `GET /api/auth/me`: Validates session token and returns active user details.
*   `GET /api/org/employees`: Query directory. Supports search query `?search=name_or_email`.
*   `POST /api/org/employees/:id/promote`: Promotes user role and department associations. *Admin only.*

### Organization Configuration
*   `GET /api/org/departments`: Returns hierarchy list.
*   `POST /api/org/departments`: Create a department. *Admin only.*
*   `PUT/DELETE /api/org/departments/:id`: Update/delete department. *Admin only.*
*   `GET /api/org/categories`: List asset categories.
*   `POST /api/org/categories`: Create a category. *Admin/Asset Manager only.*
*   `PUT/DELETE /api/org/categories/:id`: Update/delete category. *Admin/Asset Manager only.*

### Asset Management
*   `GET /api/assets`: List, search, and filter assets. Supports:
    *   `?search=keyword` (matches `name`, `assetTag`, `serialNumber`)
    *   `?categoryId=uuid`
    *   `?status=AssetStatusEnum`
    *   `?departmentId=uuid`
    *   `?assignedToId=uuid`
*   `POST /api/assets`: Register a new asset. *Admin/Asset Manager only.*
*   `GET /api/assets/:id`: Get detailed asset record.
*   `PUT /api/assets/:id`: Edit asset details. *Admin/Asset Manager only.*
*   `PATCH /api/assets/:id`: Edit asset status (transitions). *Admin/Asset Manager/Dept Head.*

### Dashboard Insights
*   `GET /api/dashboard/kpis`: General overview metrics counts.
*   `GET /api/dashboard/recent`: Top 5 recently registered assets.
*   `GET /api/dashboard/returns`: Top 5 allocated assets sorted by oldest allocation date.