import AllBooks from './pages/AllBooks'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import ErrorPage from './pages/ErrorPage'
import Cart from './pages/Cart'
import UserProfile from './pages/UserProfile'
import SingleBook from './pages/SingleBook'
import Categories from './pages/Categories'
import { SignUp } from './pages/SignUp'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import CheckRole from './components/PrivateUserRoute'

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
            <CheckRole role="customer">
              <Cart />
            </CheckRole>
          ),
        },
        {
          path: 'profile',
          element: (
            <CheckRole role="customer">
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
          path: 'login',
          element: <Login />,
        },
        {
          path: 'admin',
          element: (
            <CheckRole role="admin">
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
