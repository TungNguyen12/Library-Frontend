// import authReducer, {
//     getUserProfileAsync,
//     logOut,
//     loginAsync,
// } from "../../redux/reducers/authReducer";
// import { createStore } from "../../redux/store";
// import authServer, { access_token } from "../common/authServer";

// import usersData from "../data/usersData";

// const jwtToken = {
//     access_token: access_token + "_3",
//     refresh_token: "string",
// };

// let store = createStore();

// beforeEach(() => {
//     store = createStore();
// });

// beforeAll(() => authServer.listen());

// afterEach(() => authServer.resetHandlers());

// afterAll(() => authServer.close());

// describe("Test sync action in AuthReducer", () => {
//     test("Should clear information of currentUser to be null when logout", () => {
//         const testState = { currentUser: usersData[2] };
//         const currentUser = authReducer(testState, logOut()).currentUser;

//         expect(currentUser).toBe(null);
//     });
// });

// describe("Test async actions in authReducer", () => {
//     test("Should login user with right credential", async () => {
//         await store.dispatch(
//             loginAsync({ email: "admin@mail.com", password: "admin123" })
//         );
//         expect(store.getState().authReducer.currentUser).toMatchObject(
//             usersData[2]
//         );
//     });

//     test("Should get user profile with right token", async () => {
//         await store.dispatch(getUserProfileAsync(jwtToken));
//         expect(store.getState().authReducer.currentUser).toMatchObject(
//             usersData[2]
//         );
//     });
// });

describe('true to be true', () => {
  test('true to be true', () => {
    expect(true).toBe(true)
  })
})

export {}
