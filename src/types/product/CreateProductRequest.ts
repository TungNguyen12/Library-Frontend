interface CreateProductDto {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}

export default CreateProductDto;
