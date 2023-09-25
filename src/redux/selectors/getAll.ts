import { AppState } from "../store";

const getAll = (state: AppState, search?: string) => {
    return state.productsReducer.products;
};

export default getAll;
