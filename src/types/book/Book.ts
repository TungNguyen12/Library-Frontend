export type Category = {
  id: number
  name: string
  image: string
}
type Book = {
  _id: string
  ISBN: string
  title: string
  edition: string
  category: string
  description: string
  publisher: string
  author: string[]
}

export default Book
