import {fireEvent, render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {Provider} from "react-redux";
import store from "../../../store/store";
import Devices from "../../../pages/Devices/Devices";


describe("Test if devices is rendered properly", () => {
    it("Should have pregled mašina", () => {
        render(
            <Provider store={store}>
                <Devices />
            </Provider>
        )
        screen.getByText('Pregled mašina');
    });
    it("Should have kreiraj grupu", () => {
        render(
            <Provider store={store}>
                <Devices />
            </Provider>
        )
        screen.getByText('Kreiraj grupu');
    });
    it("Should have kreiraj mašinu", () => {
        render(
            <Provider store={store}>
                <Devices />
            </Provider>
        )
        screen.getByText('Kreiraj mašinu');
    });
    it("Should have pretraži grupe", () => {
        render(
            <Provider store={store}>
                <Devices />
            </Provider>
        )
        screen.getAllByText('Pretraži grupe');
    });
    it("Should have pretraži uređaje", () => {
        render(
            <Provider store={store}>
                <Devices />
            </Provider>
        )
        screen.getAllByText('Pretraži uređaje');
    });
    it("Should be able to show some devices", async () => {
        const {getByTestId, getAllByRole, container} = render(
            <Provider store={store}>
                <Devices />
            </Provider>
        )

        const deviceSearchField = getByTestId("deviceSearchField");

        await act(async () => {
            fireEvent.click(deviceSearchField);
        })

        await act(async () => {
            fireEvent.change(deviceSearchField, {target: {value: "e"}})
            fireEvent.blur(deviceSearchField)
        })
    })
});
