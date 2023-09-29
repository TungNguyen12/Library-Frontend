import { AppState } from "../../store";

const getTotalQuantity = (state: AppState) => {
    let total = 0;
    state.cartReducer.forEach((item) => {
        total += item.quantity;
    });
    return total;
};

export default getTotalQuantity;
