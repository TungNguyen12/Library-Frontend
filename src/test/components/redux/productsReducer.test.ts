import { fetchAllProductsAsync } from "../../../redux/services/ProductServices";
import store from "../../../redux/store";
import Product from "../../../types/Product";

describe("product reducer", () => {
    let initialProductState: {
        products: [];
        isLoading: false;
    };
    let stateAfter: {
        products: Product[];
        isLoading: boolean;
        error?: string;
    };
    let mockProducts: Product[] = [
        {
            id: 1,
            title: "A product",
            price: 97,
            description: "This is description",
            category: {
                id: 5,
                name: "Furniture",
                image: "string",
            },
            images: ["dsada"],
        },
    ];

    beforeEach(async () => {
        await store.dispatch(
            fetchAllProductsAsync.fulfilled(mockProducts, "fulfilled")
        );
        initialProductState = store.getState().persistedReducer;
        console.log(initialProductState);
    });

    test("should have the initial state", () => {
        //act
        stateAfter = store.getState().persistedReducer;

        //assert
        expect(initialProductState).toBe(stateAfter);
        expect(initialProductState.products.length).toBeGreaterThan(2);
    });
});
