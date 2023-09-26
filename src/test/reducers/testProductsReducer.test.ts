import productsReducer, {
    sortProductByPrice,
} from "../../redux/reducers/productsReducer";
import {
    deleteProductAsync,
    fetchAllProductsAsync,
    updateProductAsync,
} from "../../redux/services/ProductServices";
import { createStore } from "../../redux/store";
import server from "../common/server";
import productsData from "../data/productsData";

let store = createStore();

beforeEach(() => {
    store = createStore();
});

// Server allow us to catch the request and stop it from sending to the API and server can return some fake data instead of effecting the real API
// Enable API mocking before the tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are completed
afterAll(() => server.close);

describe("Test sync action in productsReducer", () => {
    test("Should sort product by price desc", () => {
        const testState = {
            products: productsData,
            isLoading: false,
            error: "",
        };
        const products = productsReducer(
            testState,
            sortProductByPrice("desc")
        ).products;
        expect(products[0]).toBe(productsData[1]);
        expect(products[2]).toBe(productsData[2]);
    });

    test("Should sort product by price asc", () => {
        const testState = {
            products: productsData,
            isLoading: false,
            error: "",
        };
        const products = productsReducer(
            testState,
            sortProductByPrice("asc")
        ).products;
        expect(products[0]).toBe(productsData[2]);
        expect(products[1]).toBe(productsData[0]);
        expect(products[2]).toBe(productsData[1]);
    });
});

describe("Test async thunk actions in productsReducer", () => {
    test("Should fetch all products", async () => {
        await store.dispatch(fetchAllProductsAsync());
        expect(
            store.getState().productsReducer.products.length
        ).toBeGreaterThan(20);
    });

    test("Should delete an existing product", async () => {
        const responseAction = await store.dispatch(deleteProductAsync(12));
        expect(responseAction.payload).toBe(12);
    });

    // test("Should update a product", async () => {
    //     await store.dispatch(updateProductAsync({ 273, {
    //         title: "Finland",
    //         price: 213,
    //         description: string,
    //         categoryId: number,
    //         images: string,
    //     }}));
    // });
});
