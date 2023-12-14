import { get } from 'http'
import authReducer, {
  getUserProfileAsync,
  logOut,
  signinAsync,
} from '../../redux/reducers/authReducer'
import { createStore } from '../../redux/store'
import authServer, { accessToken } from '../common/authServer'

import usersData from '../data/usersData'

const token = accessToken + '_phuoc5@mail.com'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => authServer.listen())

afterEach(() => authServer.resetHandlers())

afterAll(() => authServer.close())

describe('Test sync action in AuthReducer', () => {
  test('Should clear information of currentUser to be null when logout', () => {
    const testState = {
      currentUser: usersData[0],
      accessToken: token,
    }
    const { currentUser, accessToken, error } = authReducer(testState, logOut())

    expect(currentUser).toBe(null)
    expect(accessToken).toBe(null)
    expect(error).toBe(null)
  })
})

describe('Test async actions in authReducer', () => {
  test('Should sign in user with right credentials', async () => {
    await store.dispatch(
      signinAsync({
        email: 'phuoc5@mail.com',
        password:
          '$2b$10$mXmjpRM2cN6IfOMC2m1PDOOvRfiMqpueHmh3bD2aAHrNtZPVJbPlm',
      })
    )

    expect(store.getState().authReducer.currentUser).toMatchObject(usersData[0])
    expect(store.getState().authReducer.accessToken).toBe(
      'user-access-token_phuoc5@mail.com'
    )
    expect(store.getState().authReducer.error).toBe(null)
  })

  test('Should NOT sign in user with wrong credentials', async () => {
    await store.dispatch(
      signinAsync({
        email: 'wrong@mail.com',
        password: 'wrong',
      })
    )
    console.log(store.getState().authReducer.currentUser)
    expect(store.getState().authReducer.currentUser).toMatchObject({})
  })

  test('Should get user profile with right token', async () => {
    await store.dispatch(getUserProfileAsync(token))
    console.log()
    expect(store.getState().authReducer.currentUser).toMatchObject(usersData[0])
  })

  test('Should NOT get user profile with wrong token', async () => {
    await store.dispatch(getUserProfileAsync('wrong'))

    expect(store.getState().authReducer.currentUser).toMatchObject({})
  })
})
