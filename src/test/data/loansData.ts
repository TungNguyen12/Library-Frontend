import { ReturnedHistory } from '../../redux/reducers/loansReducer'

const loansData: ReturnedHistory = {
  history: [
    {
      book: {
        _id: '655d13daf50dd1ceca878b43',
        title: 'Conan',
        img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
      },
      borrowed_Date: '2023-12-13T18:35:41.926Z',
      returned: true,
      returned_Date: '2023-12-13T18:36:04.650Z',
    },
    {
      book: {
        _id: '657a0507ccee1ceaadae2860',
        title: 'The Gambler',
        img: 'https://images-na.ssl-images-amazon.com/images/S/c…d.photo.goodreads.com/books/1630563932i/12857.jpg',
      },
      borrowed_Date: '2023-12-13T19:38:00.219Z',
      returned: false,
    },
  ],
}

export default loansData
