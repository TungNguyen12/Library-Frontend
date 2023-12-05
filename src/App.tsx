import AllBooks from './pages/AllBooks'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import ErrorPage from './pages/ErrorPage'
import Cart from './pages/Cart'
import UserProfile from './pages/UserProfile'
import SingleBook from './pages/SingleBook'
import Categories from './pages/Categories'

import { Signin } from './pages/Signin'
import AdminDashboard from './pages/AdminDashboard'
import CheckRole from './components/PrivateUserRoute'
import SignUp from './pages/SignUp'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <AllBooks />,
        },
        {
          path: 'cart',
          element: (
            <CheckRole role="Borrower">
              <Cart />
            </CheckRole>
          ),
        },
        {
          path: 'profile',
          element: (
            <CheckRole role="Borrower">
              <UserProfile />
            </CheckRole>
          ),
        },
        {
          path: ':bookId',
          element: <SingleBook />,
        },
        {
          path: 'categories',
          element: <Categories />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },

        {
          path: 'signin',
          element: <Signin />,
        },
        {
          path: 'admin',
          element: (
            <CheckRole role="Admin">
              <AdminDashboard />,
            </CheckRole>
          ),
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
