# Book Store

A React-based book store application using the Open Library API for book data and Firebase for anonymous authentication and persistent shopping basket storage.

**[Live Demo](https://book-store-lucjan.vercel.app/)**

## Features

- Search for books using the Open Library API
- Paginated search results
- Book details page with author information, descriptions, subjects and publication data
- Shopping basket with:

  - Add and remove books
  - Increase and decrease quantities
  - Automatic total calculation
  - Persistent basket storage using Firebase Firestore
- Anonymous Firebase authentication to associate basket data with a user
- Checkout form and order confirmation flow
- Search and pagination state preserved across navigation
- Reusable React components
- Custom 404 page

## Technologies

- **React**
- **React Router**
- **Firebase Authentication**
- **Firebase Firestore**
- **Open Library API**
- **Vite**
- **CSS**

## Project Structure

- `src/pages` — page-level components such as the book list, basket, checkout and book details
- `src/components` — reusable UI components
- `src/hooks` — reusable application logic and state management
- `src/utils` — utility functions such as basket calculations
- `src/firebase.js` — Firebase configuration and Firestore operations
- `src/auth.js` — anonymous authentication logic

## Running Locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## Notes

Book information and cover images are provided by the Open Library API. Book prices are generated for demonstration purposes and do not represent real product prices.

This project was built to practise and demonstrate React development, including working with external APIs, asynchronous data fetching, state management, routing, Firebase persistence, reusable components and application structure.
