import cartReducer, {
    addToCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from "../../redux/reducers/cardReducer";
import cartData from "../data/cartData";
import categoriesData from "../data/categoriesData";

describe("Test sync actions in cartReducer", () => {
    test("Should add an item to card", () => {
        const testState = cartData;

        const cartProducts = cartReducer(
            testState,
            addToCart({
                id: 2,
                title: "Refined Frozen Salad",
                price: 946,
                description:
                    "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
                images: [
                    "https://picsum.photos/640/640?r=3258",
                    "https://picsum.photos/640/640?r=8943",
                    "https://picsum.photos/640/640?r=3475",
                ],
                category: categoriesData[0],
            })
        );
        expect(cartProducts[1].quantity).toBe(2);
    });

    test("Should remove an item from card", () => {
        const testState = cartData;

        const cartProducts = cartReducer(testState, removeFromCart(1));
        expect(cartProducts.length).toBe(2);
    });

    test("Should increase quantity of an item in cart", () => {
        const testState = cartData;
        const cartProducts = cartReducer(testState, incrementQuantity(1));
        expect(cartProducts[0].quantity).toBe(2);
    });

    test("Should decrease quantity of an item in cart", () => {
        const testState = cartData;
        const cartProducts = cartReducer(testState, decrementQuantity(1));
        expect(cartProducts.length).toBe(2);
    });
});
