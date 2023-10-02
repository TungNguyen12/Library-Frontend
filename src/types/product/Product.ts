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
    category: Category;
    images: string[];
}

export default Product;
