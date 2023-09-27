import CartItem from "../../types/cart/CartItem";

const cartData: CartItem[] = [
    {
        id: 11,
        title: "Tasty Bronze Mouse",
        price: 480,
        description:
            "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        images: [
            "https://picsum.photos/640/640?r=8082",
            "https://picsum.photos/640/640?r=2080",
            "https://picsum.photos/640/640?r=8843",
        ],
        categoryId: 2,
        quantity: 1,
    },

    {
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
        quantity: 1,
    },

    {
        id: 13,
        title: "Rustic Rubber Chips",
        price: 158,
        description:
            "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
        images: [
            "https://picsum.photos/640/640?r=5734",
            "https://picsum.photos/640/640?r=4817",
            "https://picsum.photos/640/640?r=2297",
        ],
        categoryId: 3,
        quantity: 1,
    },
];

export default cartData;
