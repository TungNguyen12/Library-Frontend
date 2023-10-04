import { AppState } from "../../store";

const getTotalCost = (state: AppState) => {
    let total = 0;
    state.cartReducer.forEach((item) => {
        total += item.quantity * item.price;
    });
    return total;
};

export default getTotalCost;
