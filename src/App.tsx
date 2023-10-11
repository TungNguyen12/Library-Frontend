import AllProducts from "./pages/AllProducts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import SingleProduct from "./pages/SingleProduct";
import Categories from "./pages/Categories";
import { SignUp } from "./pages/SignUp";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CheckRole from "./components/PrivateUserRoute";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <AllProducts />,
                },
                {
                    path: "cart",
                    element: (
                        <CheckRole role="customer">
                            <Cart />
                        </CheckRole>
                    ),
                },
                {
                    path: "profile",
                    element: (
                        <CheckRole role="customer">
                            <UserProfile />
                        </CheckRole>
                    ),
                },
                {
                    path: ":productId",
                    element: <SingleProduct />,
                },
                {
                    path: "categories",
                    element: <Categories />,
                },
                {
                    path: "signup",
                    element: <SignUp />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "admin",
                    element: (
                        <CheckRole role="admin">
                            <AdminDashboard />,
                        </CheckRole>
                    ),
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
