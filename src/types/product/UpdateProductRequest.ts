interface UpdateProductDto {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string;
}

interface UpdateProductRequest {
    id: number;
    update: UpdateProductDto;
}

export default UpdateProductRequest;
