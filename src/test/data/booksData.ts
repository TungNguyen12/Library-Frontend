import Book from '../../types/book/Book'
import categoriesData from './categoriesData'

const booksData: Book[] = [
  {
    _id: '655d13daf50dd1ceca878b43',
    ISBN: '0756603390',
    title: 'something69',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
    author: [
      {
        _id: '6546a7febac08f6bd30c0505',
        firstName: 'Leo',
        lastName: 'Tolstoy',
      },
    ],
  },

  {
    _id: '655ec8104202fd2aa0055472',
    ISBN: '099777035X',
    title: 'something420',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
    author: [
      {
        _id: '6546a7febac08f6bd30c0505',
        firstName: 'Leo',
        lastName: 'Tolstoy',
      },
    ],
  },

  {
    _id: '655ec83e4202fd2aa0055474',
    ISBN: '0517682397',
    title: 'something69420',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
    author: [
      {
        _id: '6546a7febac08f6bd30c0505',
        firstName: 'Leo',
        lastName: 'Tolstoy',
      },
    ],
  },
]

export default booksData
