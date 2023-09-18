import { PropsWithChildren, ReactElement } from "react"
import { RenderOptions, render } from "@testing-library/react"
import store from "../shared/store"
import { Provider } from "react-redux"

const appRender = (
    component: ReactElement,
    options: RenderOptions = {}
) => {
    const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
        return <Provider store={store}>{children}</Provider>
    }
    return {
        ...render(component, {wrapper: Wrapper, ...options})
    }
}

export default appRender