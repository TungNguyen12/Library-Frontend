import Book from '../book/Book'

export default interface CartItem extends Book {
  quantity: number
}
