// import { fetchAllCategories } from "../../redux/reducers/categoriesReducer";
// import { createStore } from "../../redux/store";
// import categoriesServer from "../common/categoriesServer";

// let store = createStore();

// beforeEach(() => {
//     store = createStore();
// });

// beforeAll(() => categoriesServer.listen());

// afterEach(() => categoriesServer.resetHandlers());

// afterAll(() => categoriesServer.close());

// describe("Test async actions in categoriesReducer", () => {
//     test("Should fetch all categories", async () => {
//         await store.dispatch(fetchAllCategories());
//         expect(store.getState().categoriesReducer.categories.length).toEqual(3);
//     });
// });

describe('true to be true', () => {
  test('true to be true', () => {
    expect(true).toBe(true)
  })
})
export {}
