import AllProducts from "./pages/AllProducts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import SingleProduct from "./pages/SingleProduct";

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
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
