import AllProducts from "./pages/AllProducts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import SingleProduct from "./pages/SingleProduct";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Categories from "./pages/Categories";
import Register from "./pages/Register";
import { SignUp } from "./pages/SignUp";

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
                    element: <Cart />,
                },
                {
                    path: "profile",
                    element: <UserProfile />,
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
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
