# ReduxCart

ReduxCart is a modern React e-commerce application built using Redux Toolkit for global state management. The project demonstrates scalable frontend architecture, centralized state management, dynamic filtering, performance optimization, and theme management using modern React best practices.

## Overview

This project includes:

- Product listing
- Product details page
- Shopping cart
- Global state management using Redux Toolkit
- Category filtering
- Price filtering
- Product search
- Product sorting
- Dark and Light theme
- Responsive design
- Performance optimization using React hooks

## Tech Stack

- React
- Vite
- Redux Toolkit
- React Redux
- React Router DOM
- JavaScript (ES6+)
- CSS
- DummyJSON API

## Features

### Shopping Cart

- Add products to cart
- Remove products from cart
- Increase and decrease quantity
- Clear cart
- Automatic total price calculation

### Product Filtering

- Filter by category
- Filter by price range
- Search products
- Sort products by price and rating
- Multiple filters applied simultaneously

### Theme Management

- Light mode
- Dark mode
- Theme persistence using Local Storage

### Performance Optimization

- useMemo
- useCallback
- React.memo
- Optimized rendering

### Responsive Design

- Mobile friendly
- Tablet friendly
- Desktop friendly

## Folder Structure

```text
src/
│
├── app/
│   └── store.js
│
├── features/
│   ├── cart/
│   │   └── cartSlice.js
│   ├── filters/
│   │   └── filterSlice.js
│   └── theme/
│       └── themeSlice.js
│
├── components/
│
├── pages/
│
├── hooks/
│
├── utils/
│
├── App.jsx
└── main.jsx
```

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/reduxcart.git
```

Navigate to the project directory

```bash
cd reduxcart
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

## Project Structure

The application uses Redux Toolkit to manage global state through dedicated slices.

- Cart Slice
  - Add to cart
  - Remove from cart
  - Update quantity
  - Clear cart

- Filter Slice
  - Category filter
  - Search filter
  - Price range filter
  - Sorting

- Theme Slice
  - Light mode
  - Dark mode
  - Theme persistence

## Learning Objectives

This project demonstrates:

- Redux Toolkit store configuration
- Slice-based state management
- React Redux integration
- Global state architecture
- Performance optimization using React hooks
- Responsive UI development
- Clean and scalable project structure

## Future Improvements

- User authentication
- Wishlist functionality
- Order history
- Checkout flow
- Payment integration
- Product reviews
- Backend integration
- Unit and integration testing

## License

This project is developed for learning and educational purposes.
