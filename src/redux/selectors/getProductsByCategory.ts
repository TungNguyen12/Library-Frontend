import { AppState } from "../store";

const getProductsByCategory = (state: AppState, categoryId: number) => {
    return state.productsReducer.products.filter(
        (p) => p.category.id === categoryId
    );
};

export default getProductsByCategory;
