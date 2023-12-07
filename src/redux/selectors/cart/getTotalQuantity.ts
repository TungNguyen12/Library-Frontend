import { AppState } from '../../store'

const getTotalQuantity = (state: AppState) => {
  let total = 0
  state.cartReducer.forEach((item) => {
    total += 1
  })
  return total
}

export default getTotalQuantity
