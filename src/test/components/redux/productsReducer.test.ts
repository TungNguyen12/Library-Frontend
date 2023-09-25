import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchAllProductsAsync } from "../../../redux/services/ProductServices";
import store from "../../../redux/store";
import Product from "../../../types/Product";

describe("product reducer", () => {
    let initialProductState: Product[];
    let stateAfter;
    let mockProducts: Product = [
        {
            title: "C product 1",
            id: 2,
            price: 10,
        },
        {
            title: "B product 2",
            id: 3,
            price: 10,
        },
        {
            title: "A product 3",
            id: 4,
            price: 10,
        },
    ];

    beforeEach(async () => {
        await store.dispatch(fetchAllProductsAsync());
        initialProductState = useAppSelector(
            (state) => state.productsReducer.products
        );
        console.log(initialProductState);
    });

    test("should have the initial state", () => {});

    it("should be true", () => {
        expect("hello").toBeTruthy();
    });
});
