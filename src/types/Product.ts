export interface Category {
    id: number;
    name: string;
    image: string;
}
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
}

export default Product;
