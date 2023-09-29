import cartReducer, {
    addToCart,
    removeFromCart,
} from "../../redux/reducers/cardReducer";
import cartData from "../data/cartData";

describe("Test sync actions in cartReducer", () => {
    test("Should add an item to card", () => {
        const testState = cartData; // 3 items, increase quantity of first item by 1 => 2

        const cartProducts = cartReducer(
            testState,
            addToCart({
                id: 12,
                title: "Refined Frozen Salad",
                price: 946,
                description:
                    "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
                images: [
                    "https://picsum.photos/640/640?r=3258",
                    "https://picsum.photos/640/640?r=8943",
                    "https://picsum.photos/640/640?r=3475",
                ],
                categoryId: 1,
            })
        );
        expect(cartProducts[1].quantity).toBe(2);
    });

    test("Should remove an item from card", () => {
        const testState = cartData; //3 items, remove first item (id: 11) out of cart => length = 2

        const cartProducts = cartReducer(testState, removeFromCart(11));
        expect(cartProducts.length).toBe(2);
    });
});
