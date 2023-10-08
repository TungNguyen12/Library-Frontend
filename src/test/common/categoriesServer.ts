import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import categoriesData from "../data/categoriesData";

export const handlers = [
    //Get All Categories
    rest.get(`https://api.escuelajs.co/api/v1/categories`, (req, res, ctx) => {
        return res(ctx.json(categoriesData));
    }),
];

const categoriesServer = setupServer(...handlers);

export default categoriesServer;
