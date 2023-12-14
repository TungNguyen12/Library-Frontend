import CategoryAPI from '../category/CategoryAPI'

type Author = {
  _id: string
  fullName: string
}
type Book = {
  _id: string
  ISBN: string
  title: string
  edition: string
  category: CategoryAPI[]
  description: string
  publisher: string
  img: string
  author: Author[]
}

export default Book
