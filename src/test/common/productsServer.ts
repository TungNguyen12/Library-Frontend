import { rest } from "msw";
import { setupServer } from "msw/node";

import productsData from "../data/productsData";
import CreateProductDto from "../../types/product/CreateProductRequest";
import categoriesData from "../data/categoriesData";
import Product from "../../types/product/Product";
import UpdateProductRequest from "../../types/product/UpdateProductRequest";

export const handlers = [
    rest.get(`https://api.escuelajs.co/api/v1/products`, (req, res, ctx) => {
        return res(ctx.json(productsData));
    }),

    rest.delete(
        "https://api.escuelajs.co/api/v1/products/:productId",

        (req, res, ctx) => {
            const { id } = req.params;
            if (productsData.find((p) => p.id === Number(id))) {
                return res(ctx.json(true));
            } else {
                return res(ctx.json(false));
            }
        }
    ),
    rest.put(
        `https://api.escuelajs.co/api/v1/products/:id`,
        async (req, res, ctx) => {
            const update: UpdateProductRequest = await req.json();
            const { id } = req.params;

            const index = productsData.findIndex((p) => p.id === Number(id));

            if (index !== -1) {
                return res(
                    ctx.json(
                        (productsData[index] = {
                            ...productsData[index],
                            ...update,
                        })
                    )
                );
            } else {
                ctx.status(400);
                return res(
                    ctx.json({
                        message: [
                            "price must be a positive number",
                            "images must contain at least 1 elements",
                            "each value in images must be a URL address",
                            "images must be an array",
                        ],
                        error: "Bad Request",
                        statusCode: 400,
                    })
                );
            }
        }
    ),

    rest.post(
        `https://api.escuelajs.co/api/v1/products/`,
        async (req, res, ctx) => {
            const input: CreateProductDto = await req.json();

            const category = categoriesData.find(
                (c) => c.id === input.categoryId
            );

            if (category) {
                const newProduct: Product = {
                    id: productsData.length + 1,
                    price: input.price,
                    title: input.title,
                    description: input.description,
                    images: input.images,
                    category,
                };
                // productsData.push(newProduct) => we don't even need to modify data, it's not in the front
                return res(ctx.json(newProduct));
            } else {
                ctx.status(400);
                ctx.json({
                    message: [
                        "price must be a positive number",
                        "images must contain at least 1 elements",
                        "each value in images must be a URL address",
                        "images must be an array",
                    ],
                    error: "Bad Request",
                    statusCode: 400,
                });
            }
        }
    ),
];

const server = setupServer(...handlers);

export default server;
