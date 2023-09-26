import { rest } from "msw";
import { setupServer } from "msw/node";
import productsData from "../data/productsData";

export const handlers = [
    // rest.get("/api/user", (req, res, ctx) => {
    //     return res(ctx.json("John Smith"), ctx.delay(150));
    // }),
    rest.delete(
        "https://api.escuelajs.co/api/v1/products/:productId",

        (req, res, ctx) => {
            console.log("catched the request");
            const { id } = req.params;
            if (productsData.find((p) => p.id === Number(id))) {
                return res(ctx.json(true));
            } else {
                return res(ctx.json(false));
            }
        }
    ),
    // rest.put(`https://api.escuelajs.co/api/v1/products/:id`),
];

const server = setupServer(...handlers);

export default server;
