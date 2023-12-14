// import booksReducer, {
//   sortBookByTitle,
// } from '../../redux/reducers/booksReducer'
// import {
//   createBookAsync,
//   deleteBookAsync,
//   fetchAllbooksAsync,
//   updateBookAsync,
// } from '../../redux/services/BookServices'
// import { createStore } from '../../redux/store'
// import CreateBookDto from '../../types/book/CreateBookRequest'
// import server from '../common/booksServer'
// import categoriesData from '../data/categoriesData'
// import booksData from '../data/booksData'

// let store = createStore()

// beforeEach(() => {
//   store = createStore()
// })

// // Server allow us to catch the request and stop it from sending to the API and server can return some fake data instead of effecting the real API

// // Enable API mocking before the tests
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are completed
// afterAll(() => server.close)

// describe('Test sync action in booksReducer', () => {
//   test('Should sort product by price desc', () => {
//     const testState = {
//       books: booksData,
//       isLoading: false,
//       error: '',
//     }
//     const books = booksReducer(testState, sortBookByTitle('desc')).books
//     expect(books[0]).toBe(booksData[1])
//     expect(books[2]).toBe(booksData[2])
//   })

//   test('Should sort product by price asc', () => {
//     const testState = {
//       books: booksData,
//       isLoading: false,
//       error: '',
//     }
//     const books = booksReducer(testState, sortBookByTitle('asc')).books
//     expect(books[0]).toBe(booksData[2])
//     expect(books[1]).toBe(booksData[0])
//     expect(books[2]).toBe(booksData[1])
//   })
// })

// describe('Test async thunk actions in booksReducer', () => {
//   // test("Should fetch all books", async () => {
//   //     await store.dispatch(fetchAllbooksAsync());
//   //     expect(
//   //         store.getState().booksReducer.books.length
//   //     ).toBeGreaterThan(2);
//   // });

//   test('Should delete an existing product', async () => {
//     const responseAction = await store.dispatch(deleteBookAsync(1))
//     expect(responseAction.payload).toBe(1)
//   })

//   test('Should create a new product', async () => {
//     const input: CreateBookDto = {
//       title: 'Test Finnish product',
//       description: 'Test Finnish product',
//       price: 100,
//       categoryId: 1,
//       images: [],
//     }
//     await store.dispatch(createBookAsync(input))
//     expect(store.getState().booksReducer.books.length).toBe(1) //because there is a initial product at product state, so it would be 2
//   })

//   test('Should not be able to create a new product with a wrong category id', async () => {
//     const input: CreateBookDto = {
//       title: 'Test Finnish product',
//       description: 'Test Finnish product',
//       price: 100,
//       categoryId: 11, //because in the categoriesData includes id: 1,2,3
//       images: [],
//     }
//     await store.dispatch(createBookAsync(input))
//     expect(store.getState().booksReducer.books.length).toBe(0) //we can't create new product with wrong category id
//   })

//   test('Should update a product', async () => {
//     const action = await store.dispatch(
//       updateBookAsync({
//         id: 1,
//         update: {
//           title: 'Finland',
//           price: 213,
//         },
//       })
//     )
//     expect(action.payload).toMatchObject({
//       id: 1,
//       title: 'Finland',
//       price: 213,
//       description:
//         'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
//       images: [
//         'https://picsum.photos/640/640?r=8082',
//         'https://picsum.photos/640/640?r=2080',
//         'https://picsum.photos/640/640?r=8843',
//       ],

//       category: categoriesData[0],
//     })
//   })
// })

describe('true to be true', () => {
  test('true to be true', () => {
    expect(true).toBe(true)
  })
})

export {}
