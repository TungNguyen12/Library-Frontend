import Product from "./Product";

interface ProductReducerState {
    products: Product[];
    isLoading: boolean;
    error?: string | undefined;
}

export default ProductReducerState;
