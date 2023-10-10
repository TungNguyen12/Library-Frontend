import { AppState } from "../store";

const getProductsByTitle = (state: AppState, search?: string) => {
    return state.productsReducer.products.filter((p) =>
        p.title.toLowerCase().includes(search?.toLowerCase() || "")
    );
};

export default getProductsByTitle;
