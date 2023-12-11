export type Category = {
  _id: string
  name: string
}

type Author = {
  _id: string
  fullName: string
}
type Book = {
  _id: string
  ISBN: string
  title: string
  edition: string
  category: Category[]
  description: string
  publisher: string
  img: string
  author: Author[]
}

export default Book
