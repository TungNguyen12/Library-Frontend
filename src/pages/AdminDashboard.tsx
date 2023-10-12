import UserControl from "../admin/UserControl";
import ProductControl from "../admin/ProductsControl";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import SwitchPanel from "../admin/components/SwitchPanel";
import { useState } from "react";

const AdminDashboard = () => {
    const [isOpenProduct, setIsOpenProduct] = useState(true);
    const [isOpenUser, setIsOpenUser] = useState(false);

    const handleOpenProduct = () => {
        setIsOpenProduct(!isOpenProduct);
        setIsOpenUser(!isOpenUser);
    };
    const handleOpenUser = () => {
        setIsOpenUser(!isOpenUser);
        setIsOpenProduct(!isOpenProduct);
    };

    return (
        <>
            <Toaster />
            <Box sx={{ width: "90%", display: "flex", margin: "auto" }}>
                <Box>
                    <SwitchPanel
                        handleOpenProduct={handleOpenProduct}
                        handleOpenUser={handleOpenUser}
                    />
                </Box>
                <Box>
                    {isOpenProduct && <ProductControl />}
                    {isOpenUser && <UserControl />}
                </Box>
            </Box>
        </>
    );
};

export default AdminDashboard;
