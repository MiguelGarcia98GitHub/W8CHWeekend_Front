import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";
import { MemoryRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { appStore } from "../../store/store";

describe("Given the Form component", () => {
    test("when we write something to the input text, it should change the input text value", () => {
        render(
            <Router>
                <Provider store={appStore}>
                    <Form />
                </Provider>
            </Router>
        );

        userEvent.type(screen.getByRole("textbox"), "PEPE");
        expect(screen.getByRole("textbox")).toHaveValue("PEPE");
    });
    test("when we click the button, it should execute the button associated functionalities", () => {
        render(
            <Router>
                <Provider store={appStore}>
                    <Form />
                </Provider>
            </Router>
        );

        userEvent.click(screen.getByRole("button"));
    });
});
