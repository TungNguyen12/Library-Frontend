import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
} from '../../redux/reducers/cartReducer'
import { Book } from '../../types/books'

import booksData from '../data/booksData'
import cartData from '../data/cartData'

describe('Test sync actions in cartReducer', () => {
  test('Should add an item to cart', () => {
    const testState: Book[] = []
    const result = cartReducer(testState, addToCart(booksData[0]))

    expect(result).toHaveLength(1)
  })

  test('Should remove an item from cart', () => {
    const testState = cartData
    const cartBooks = cartReducer(testState, removeFromCart(cartData[0]))

    expect(cartBooks.length).toBe(2)
    expect(cartBooks[0]).toMatchObject(booksData[1])
  })

  test('Should clear cart', () => {
    const testState = cartData
    const cartBooks = cartReducer(testState, clearCart())
    expect(cartBooks).toHaveLength(0)
  })
})
