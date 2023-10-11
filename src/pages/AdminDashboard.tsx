import UserControl from "../admin/UserControl";
import ProductControl from "../admin/ProductsControl";

const AdminDashboard = () => {
    return (
        <>
            <ProductControl />
            <UserControl />
        </>
    );
};

export default AdminDashboard;
