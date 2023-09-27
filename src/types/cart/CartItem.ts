import Product from "../Product";

export default interface CartItem extends Product {
    quantity: number;
}
