import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Pages
import Layout from './pages/Layout'
import ErrorPage from './pages/ErrorPage'
import CartPage from './pages/CartPage'
import SingleBookPage from './pages/SingleBookPage'
import SigninPage from './pages/SigninPage'
import AdminDashboard from './pages/AdminDashboard'
import CheckRole from './components/PrivateUserRoute'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import MyLoanPage from './pages/MyLoanPage'
import UserPage from './pages/UserPage'

const App = () => {
  // Role-Checked Components
  const CartWithRoleCheck = () => (
    <CheckRole role="Borrower">
      <CartPage />
    </CheckRole>
  )

  const UserPageWithRoleCheck = () => (
    <CheckRole role="Borrower">
      <UserPage />
    </CheckRole>
  )

  const MyLoanPageWithRoleCheck = () => (
    <CheckRole role="Borrower">
      <MyLoanPage />
    </CheckRole>
  )

  const AdminDashboardWithRoleCheck = () => (
    <CheckRole role="Admin">
      <AdminDashboard />
    </CheckRole>
  )

  // Router Configuration
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/cart', element: <CartWithRoleCheck /> },
        { path: '/profile', element: <UserPageWithRoleCheck /> },
        { path: '/myloans', element: <MyLoanPageWithRoleCheck /> },
        { path: '/:bookId', element: <SingleBookPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/signin', element: <SigninPage /> },
        { path: '/admin', element: <AdminDashboardWithRoleCheck /> },
      ],
    },
  ])

  // Render
  return <RouterProvider router={router} />
}

export default App
