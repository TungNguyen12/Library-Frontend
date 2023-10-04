import { rest } from "msw";
import { setupServer } from "msw/node";

export const handlers = [];

const userServer = setupServer(...handlers);

export default userServer;
