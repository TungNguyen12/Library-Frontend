// import usersReducer, {
//     clearStateLogout,
//     getAllUsersAsync,
//     registerUserAsync,
// } from "../../redux/reducers/userReducer";
// import { createStore } from "../../redux/store";
// import CreateUserDto from "../../types/user/RegisterUserRequest";
// import userServer from "../common/userServer";
// import usersData from "../data/usersData";

// let store = createStore();

// beforeEach(() => {
//     store = createStore();
// });

// beforeAll(() => userServer.listen());

// afterEach(() => userServer.resetHandlers());

// afterAll(() => userServer.close());

// describe("Test sync action in usersReducer", () => {
//     test("Should clear up users (customer) from persist when logout", () => {
//         const testState = { users: usersData };
//         const clearedUsers = usersReducer(testState, clearStateLogout()).users;

//         expect(clearedUsers).toStrictEqual([]);
//     });
// });

// describe("Test async actions in usersReducer", () => {
//     test("Should fetch all users", async () => {
//         await store.dispatch(getAllUsersAsync());

//         expect(store.getState().usersReducer.users.length).toEqual(3);
//     });

//     test("Should create/register new user", async () => {
//         const input: CreateUserDto = {
//             email: "redux_the_best@mail.com",
//             name: "Dogggg",
//             password: "12345678",
//             avatar: "https://i.imgur.com/DumuKkD.jpeg",
//         };
//         const res = await store.dispatch(registerUserAsync(input));
//         expect(res.meta.arg).toMatchObject({
//             email: "redux_the_best@mail.com",
//             name: "Dogggg",
//             password: "12345678",
//             avatar: "https://i.imgur.com/DumuKkD.jpeg",
//         });
//     });
// });

// describe('true to be true', () => {
//   test('true to be true', () => {
//     expect(true).toBe(true)
//   })
// })
export {}
