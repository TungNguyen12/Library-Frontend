import cartReducer, {
    addToCart,
    removeFromCart,
} from "../../redux/reducers/cardReducer";
import cartData from "../data/cartData";

describe("Test sync actions in cartReducer", () => {
    test("Should add an item to card", () => {
        const testState = cartData; // 3 items, increase quantity of first item by 1 => 2

        const cartItems = cartReducer(testState, addToCart(testState[0]));
        expect(cartItems[0].quantity).toBe(2);
    });

    test("Should remove an item from card", () => {
        const testState = cartData; //3 items, remove first item (id: 11) out of cart => length = 2

        const cartItems = cartReducer(testState, removeFromCart(11));
        expect(cartItems.length).toBe(2);
    });
});
