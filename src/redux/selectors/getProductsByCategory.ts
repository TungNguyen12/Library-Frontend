import { AppState } from "../store";

const getProductsByCategory = (state: AppState, category: number) => {
    return state.productsReducer.products.filter(
        (p) => p.category.id === category
    );
};

export default getProductsByCategory;
