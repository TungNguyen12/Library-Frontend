import { render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../shared/store"
import App from "../../App"
import appRender from "./appRender"
import userServer from "../servers/userServer"

beforeAll(() => userServer.listen())
afterAll(() => userServer.close())

describe("Test App component", () => {
    test("Should layout match snapshot", async () => {
        /* const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>
        ) */
        //const {baseElement, findByText} = appRender(<App />)
        // expect(baseElement).toMatchSnapshot()
        appRender(<App />)
        // expect(screen.getAllByText("Create new user").length).toBe(1)
        await waitFor(() => screen.getAllByText(/sabrina/i))
        expect(screen.getAllByText(/sabrina/i).length).toBe(1)
        expect(screen.getAllByText(/mail/i).length).toBe(4)

    })
})