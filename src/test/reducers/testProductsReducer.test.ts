import productsReducer, {
    sortProductByPrice,
} from "../../redux/reducers/productsReducer";
import {
    createProductAsync,
    deleteProductAsync,
    fetchAllProductsAsync,
    updateProductAsync,
} from "../../redux/services/ProductServices";
import { createStore } from "../../redux/store";
import CreateProductDto from "../../types/product/CreateProductRequest";
import server from "../common/server";
import categoriesData from "../data/categoriesData";
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
        ).toBeGreaterThan(10);
    });

    test("Should delete an existing product", async () => {
        const responseAction = await store.dispatch(deleteProductAsync(1));
        expect(responseAction.payload).toBe(1);
    });

    test("Should create a new product", async () => {
        const input: CreateProductDto = {
            title: "Test Finnish product",
            description: "Test Finnish product",
            price: 100,
            categoryId: 1,
            images: [],
        };
        await store.dispatch(createProductAsync(input));
        expect(store.getState().productsReducer.products.length).toBe(2); //because there is a initial product at product state, so it would be 2
    });

    test("Should not be able to create a new product with a wrong category id", async () => {
        const input: CreateProductDto = {
            title: "Test Finnish product",
            description: "Test Finnish product",
            price: 100,
            categoryId: 11, //because in the categoriesData includes id: 1,2,3
            images: [],
        };
        await store.dispatch(createProductAsync(input));
        expect(store.getState().productsReducer.products.length).toBe(1); //we can't create new product with wrong category id
    });

    test("Should update a product", async () => {
        const action = await store.dispatch(
            updateProductAsync({
                id: 1,
                update: {
                    title: "Finland",
                    price: 213,
                },
            })
        );
        expect(action.payload).toMatchObject({
            id: 1,
            title: "Finland",
            price: 213,
            description:
                "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
            images: [
                "https://picsum.photos/640/640?r=8082",
                "https://picsum.photos/640/640?r=2080",
                "https://picsum.photos/640/640?r=8843",
            ],

            category: categoriesData[0],
        });
    });
});
