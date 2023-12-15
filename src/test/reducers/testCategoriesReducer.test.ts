import { getAllCategoriesAsync } from '../../redux/reducers/categoriesReducer'
import { createStore } from '../../redux/store'
import categoriesServer from '../common/categoriesServer'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => categoriesServer.listen())

afterEach(() => categoriesServer.resetHandlers())

afterAll(() => categoriesServer.close())

describe('Test async actions in categoriesReducer', () => {
  test('Should fetch all categories', async () => {
    await store.dispatch(getAllCategoriesAsync())
    expect(store.getState().categoriesReducer.categories.length).toEqual(3)
  })
})
