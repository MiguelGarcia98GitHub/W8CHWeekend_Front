import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { appStore } from "../store/store";
import { Provider } from "react-redux";
import App from "./App";

describe("Given App component", () => {
    describe("When we render the component", () => {
        test("Then it should display the title", () => {
            render(
                <Router>
                    <Provider store={appStore}>
                        <App />
                    </Provider>
                </Router>
            );

            const element = screen.getByText("React");
            expect(element).toBeInTheDocument();
        });
    });
});
