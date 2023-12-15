import { getAllAuthorsAsync } from '../../redux/reducers/authorsReducer'
import { createStore } from '../../redux/store'
import authorsServer from '../common/authorsServer'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => authorsServer.listen())

afterEach(() => authorsServer.resetHandlers())

afterAll(() => authorsServer.close())

describe('Test async actions in authorsReducer', () => {
  test('Should fetch all categories', async () => {
    await store.dispatch(getAllAuthorsAsync())

    expect(store.getState().authorsReducer.authors.length).toEqual(3)
  })
})

