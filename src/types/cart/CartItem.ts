import Product from "../product/Product";

export default interface CartItem extends Product {
    quantity: number;
}
