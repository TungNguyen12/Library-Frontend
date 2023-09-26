import store, { AppState } from "../store";

const getProductsByTitle = (state: AppState, search?: string) => {
    console.log(store.getState());
    console.log(state);
    return state.productsReducer.products.filter((p) =>
        p.title.toLowerCase().includes(search?.toLowerCase() || "")
    );
};

export default getProductsByTitle;
