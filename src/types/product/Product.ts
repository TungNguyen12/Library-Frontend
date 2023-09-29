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
    categoryId: number;
    images: string[];
}

export default Product;
