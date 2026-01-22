# Burger House - FullStack Burger E-Commerce App

A full-stack fast-food e-commerce application where users can order from a curated menu or build custom burgers with their choice of ingredients. Features real-time order tracking with map integration.

[![Netlify Status](https://api.netlify.com/api/v1/badges/1feafbfb-a66d-47c4-bdd3-e27ecd92d92c/deploy-status)](https://app.netlify.com/sites/burger-house-sreekar/deploys)

**Live Demo:** https://burger-house-sreekar.netlify.app/

## Features

- **Custom Burger Builder** - Create your own burger by selecting ingredients
- **Menu Ordering** - Browse and order from pre-designed menu items
- **User Authentication** - Secure login/signup with JWT
- **Order Management** - Track order status and history
- **Live Delivery Tracking** - Real-time location tracking via MapBox
- **Admin Dashboard** - Manage orders and update order statuses
- **Responsive Design** - Works across desktop and mobile devices

## Tech Stack

| Category         | Technologies                                                               |
| ---------------- | -------------------------------------------------------------------------- |
| Framework        | [Next.js](https://nextjs.org/) (React)                                     |
| Language         | [TypeScript](https://www.typescriptlang.org/)                              |
| API              | [tRPC](https://trpc.io/) + [Tanstack Query](https://tanstack.com/query/v4) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/)                             |
| Database         | [MongoDB](https://mongodb.com/) + [Mongoose](https://mongoosejs.com/)      |
| Validation       | [Zod](https://zod.dev/)                                                    |
| Animations       | [Framer Motion](https://www.framer.com/motion/)                            |
| Maps             | [MapBox GL](https://www.mapbox.com/)                                       |
| Styling          | [Sass](https://sass-lang.com/)                                             |
| Image Hosting    | [Cloudinary](https://cloudinary.com/)                                      |

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

### Build

```bash
yarn build
yarn start
```

## Screenshots

### Home Page
![Home Page](assets/home.png)

### Menu Page
![Menu Page](assets/menu.png)

### Custom Burger Builder
Build your own burger with your favorite ingredients.

![Burger Builder Step 1](assets/make-1.png)
![Burger Builder Step 2](assets/make-2.png)

### Customer Dashboard
View order status, track delivery location, update profile, and manage orders.

![Customer Dashboard 1](assets/customer-dashboard-1.png)
![Customer Dashboard 2](assets/customer-dashboard-2.png)
![Customer Dashboard 3](assets/customer-dashboard-3.png)

### Admin Dashboard
Manage and update order statuses.

![Admin Dashboard 1](assets/admin-dashboard-1.png)
![Admin Dashboard 2](assets/admin-dashboard-2.png)

## Demo Credentials

> **Note:** These are for demo purposes only.

| Role  | Email           | Password |
| ----- | --------------- | -------- |
| Admin | admin@email.com | Pass123# |
| User  | user1@email.com | Pass123# |

You can also create your own account to test the user experience.
