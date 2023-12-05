export type Category = {
  id: number
  name: string
  image: string
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
  category: string
  description: string
  publisher: string
  img: string
  author: Author[]
}

export default Book
