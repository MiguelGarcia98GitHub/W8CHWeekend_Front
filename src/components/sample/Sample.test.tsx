import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "../../store/store";
import { Sample } from "./Sample";

describe("Given the Sample component", () => {
    test("when we click on the button, it should execute the button associated functionalities", async () => {
        render(
            <Router>
                <Provider store={appStore}>
                    <Sample />
                </Provider>
            </Router>
        );
    });
    test("when we click the button, it should execute the button associated functionalities", async () => {
        render(
            <Router>
                <Provider store={appStore}>
                    <Sample />
                </Provider>
            </Router>
        );
        const button1 = screen.getByRole("button", {
            name: "DELETE CHARACTER 1",
        });

        await fireEvent.click(button1);
    });
    test("when we click the checkbox, it should execute the checkbox associated functionalities", async () => {
        render(
            <Router>
                <Provider store={appStore}>
                    <Sample />
                </Provider>
            </Router>
        );

        const checkboxList = await screen.findAllByRole("checkbox");
        await fireEvent.click(checkboxList[0]);
    });
});
