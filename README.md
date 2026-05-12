# STOCKIFY — Production-Ready Inventory Management Platform

A full-stack inventory and sales analytics platform built with Next.js, Express.js, PostgreSQL, and AWS cloud infrastructure.

STOCKIFY helps businesses manage products, monitor inventory, track expenses, and visualize sales performance through an interactive analytics dashboard.

---

## Live Demo

- Live App: https://master.dxotlt5op7luo.amplifyapp.com
- Video Demo: https://youtu.be/VRFqUQb4c8M

---

## Preview

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

# Features

- Inventory and product management
- Sales and purchase tracking
- Expense monitoring and analytics
- Interactive dashboard with charts and statistics
- Search and filtering functionality
- Persistent UI preferences with Redux Persist
- Responsive layout for desktop and tablet
- Cloud deployment with AWS services

---

# Tech Stack

## Frontend

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit + RTK Query
- Redux Persist
- MUI DataGrid
- Recharts
- Lucide React

## Backend

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Helmet
- Morgan
- CORS
- dotenv

## Infrastructure

- AWS Amplify
- Amazon EC2
- Amazon RDS (PostgreSQL)
- Amazon S3
- PM2

---

# Architecture

## Infrastructure Overview

- Frontend deployed on AWS Amplify with CI/CD connected to GitHub
- Backend hosted on Amazon EC2 using PM2
- PostgreSQL database hosted on Amazon RDS in a private subnet
- Product images and assets stored in Amazon S3
- Environment variables managed securely across services

---

# Engineering Highlights

- Built a scalable full-stack architecture using separate frontend and backend services
- Implemented RTK Query caching for efficient API data fetching
- Used Prisma with PostgreSQL driver adapters for improved database connectivity
- Configured AWS RDS inside a private subnet accessible only through EC2 security groups
- Added Redux Persist to preserve user UI preferences
- Created reusable dashboard and chart components for analytics visualization
- Structured backend using controllers and route-based architecture
- Configured PM2 for backend process management and reliability
- Automated frontend deployment through AWS Amplify CI/CD pipelines

---

# Data Model

Core entities include:

- Products
- Sales
- Purchases
- Expenses
- Users
- Analytics summaries

Relationships:
- Products are connected to sales and purchases
- Expense summaries aggregate categorized expenses
- Analytics tables provide dashboard metrics and reporting

---

# Challenges & Solutions

## Handling BigInt Serialization

PostgreSQL BigInt values returned by Prisma are not directly JSON serializable.

Implemented transformation logic before API responses to safely serialize BigInt values and prevent runtime errors.

## Secure Database Networking

Configured Amazon RDS inside a private subnet and restricted database access exclusively through EC2 security groups.

## State Management Optimization

Used RTK Query caching and centralized Redux state management to reduce redundant API requests and simplify frontend data flow.

---

# Project Structure

```bash
stockify/
├── client/     # Next.js frontend
├── server/     # Express API + Prisma
└── screenshots/
```

---

# Local Development

## Clone the Repository

```bash
git clone https://github.com/progymer/STOCKIFY.git
cd stockify
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB
PORT=3001
```

Run migrations and start the server:

```bash
npx prisma migrate deploy
npx prisma generate
npm run seed
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

---

# Deployment

## Frontend — AWS Amplify

- Connected to GitHub for automatic deployments
- Environment variables configured through Amplify Console

## Backend — Amazon EC2

```bash
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Database — Amazon RDS

- PostgreSQL deployed in a private subnet
- Access restricted to EC2 security group only

---
