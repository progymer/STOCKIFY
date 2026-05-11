# STOCKIFY — Inventory Management System

**Live:** [https://master.dxotlt5op7luo.amplifyapp.com](https://master.dxotlt5op7luo.amplifyapp.com)

---

## Demo

[![Stockify Demo](https://img.youtube.com/vi/VRFqUQb4c8M/maxresdefault.jpg)](https://youtu.be/VRFqUQb4c8M)


<table>
  <tr>
    <td width="60%">
      <img src="./screenshots/1.png" alt="Dashboard" width="100%" style="border-radius:8px"/>
    </td>
    <td width="40%">
      <img src="./screenshots/2.png" alt="Products" width="100%" style="border-radius:8px"/>
    </td>
  </tr>
  <tr>
    <td width="40%">
      <img src="./screenshots/3.png" alt="Inventory" width="100%" style="border-radius:8px"/>
    </td>
    <td width="60%">
      <img src="./screenshots/4.png" alt="Expenses" width="100%" style="border-radius:8px"/>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="./screenshots/5.png" alt="Settings" width="60%" style="border-radius:8px"/>
    </td>
  </tr>
</table>

---

## Architecture

```
User
 │
 ├──► AWS Amplify (Next.js frontend)
 │         │
 │         ▼
 │    VPC Internet Gateway
 │         │
 │    ┌────▼─────────────────────┐
 │    │  Virtual Private Cloud   │
 │    │                          │
 │    │  ┌── Public Subnet ────┐ │
 │    │  │  Amazon EC2         │ │  ← Express API (Node.js / PM2)
 │    │  │  (backend)          │ │
 │    │  └────────┬────────────┘ │
 │    │           │              │
 │    │  ┌── Private Subnet ──┐  │
 │    │  │  Amazon RDS        │  │  ← PostgreSQL database
 │    │  │  (database)        │  │
 │    │  └────────────────────┘  │
 │    └──────────────────────────┘
 │
 └──► AWS S3 (static assets — images, logo)
```

- **Frontend** → AWS Amplify (CI/CD from Git)
- **Backend** → AWS EC2 in a public subnet, security group locked to port `3001`
- **Database** → AWS RDS PostgreSQL in a private subnet, only reachable from EC2
- **Assets** → S3 bucket with public read for product images and logo

---

## Tech Stack

**Frontend**
- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Redux Toolkit + RTK Query · Redux Persist
- MUI DataGrid · Recharts · Lucide React

**Backend**
- Express.js · TypeScript
- Prisma v7 + `@prisma/adapter-pg` (driver adapter mode)
- Helmet · Morgan · CORS · dotenv

**Infrastructure**
- AWS Amplify · EC2 · RDS (PostgreSQL) · S3 · PM2

---

## Database Schema

```
Products ──┬──► Sales
           └──► Purchases

ExpenseSummary ──► ExpenseByCategory

Users
Expenses
SalesSummary
PurchaseSummary
```

| Table | Key Fields |
|---|---|
| `Products` | `productId`, `name`, `price`, `rating`, `stockQuantity` |
| `Sales` | `saleId`, `productId` (FK), `timestamp`, `quantity`, `unitPrice`, `totalAmount` |
| `Purchases` | `purchaseId`, `productId` (FK), `timestamp`, `quantity`, `unitCost`, `totalCost` |
| `Expenses` | `expenseId`, `category`, `amount`, `timestamp` |
| `SalesSummary` | `salesSummaryId`, `totalValue`, `changePercentage`, `date` |
| `PurchaseSummary` | `purchaseSummaryId`, `totalPurchased`, `changePercentage`, `date` |
| `ExpenseSummary` | `expenseSummaryId`, `totalExpenses`, `date` |
| `ExpenseByCategory` | `expenseByCategoryId`, `expenseSummaryId` (FK), `category`, `amount` (BigInt), `date` |
| `Users` | `userId`, `name`, `email` |

> `ExpenseByCategory.amount` is stored as `BigInt` in Prisma — serialized to string before sending over JSON.

---

## API Endpoints

| Method | Route | Controller |
|---|---|---|
| `GET` | `/dashboard` | `getDashboardMetrics` |
| `GET` | `/products?search=` | `getProducts` |
| `POST` | `/products` | `createProduct` |
| `GET` | `/users` | `getUsers` |
| `GET` | `/expenses` | `getExpensesByCategory` |

---

## Project Structure

```
stockify/
├── client/
│   └── src/
│       ├── app/
│       │   ├── (components)/     # Navbar, Sidebar, Rating, LoadingSpinner
│       │   ├── dashboard/        # Cards: Sales, Purchase, Expense, Popular Products, StatCard
│       │   ├── inventory/        # MUI DataGrid
│       │   ├── products/         # Product grid + CreateProductModal
│       │   ├── expenses/         # Pie chart + filters
│       │   ├── users/            # MUI DataGrid
│       │   ├── settings/         # Toggle + text settings
│       │   └── redux.tsx         # Store + PersistGate + StoreProvider
│       └── state/
│           ├── api.ts            # RTK Query slice (all endpoints)
│           └── index.tsx         # Global slice (isDarkMode, isSidebarCollapsed)
│
└── server/
    ├── src/
    │   ├── controllers/          # dashboardController, productController, etc.
    │   ├── routes/               # Express routers
    │   └── lib/prisma.ts         # PrismaClient singleton with PrismaPg adapter
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seed.ts
    │   └── seedData/             # JSON files for all tables
    └── ecosystem.config.js       # PM2 config
```

---

## Local Setup

### Server

```bash
cd server && npm install
```

`.env`:
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB
PORT=3001
```

```bash
npx prisma migrate deploy
npx prisma generate
npm run seed
npm run dev
```

### Client

```bash
cd client && npm install
```

`.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
npm run dev
```

---

## Deployment

### Amplify (Frontend)
- Connected to Git repo, auto-deploys on push
- Set `NEXT_PUBLIC_API_URL` in Amplify Console → Environment variables

### EC2 (Backend)
```bash
npm run build          # compiles TS → dist/
pm2 start ecosystem.config.js
pm2 save && pm2 startup
```

### RDS
- Private subnet, port `5432` open only to EC2 security group
- `DATABASE_URL` set as environment variable on EC2
