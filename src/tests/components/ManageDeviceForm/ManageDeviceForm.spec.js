import { act } from "react-dom/test-utils";
import store from "../../../store/store"
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ManageDeviceForm from "../../../components/ManageDeviceForm/ManageDeviceForm";
import { Provider } from "react-redux";

it("Manage device form error messages test", async () => {
    const { getByTestId, getAllByRole, container } = render(<Provider store={store}>
        <ManageDeviceForm/>
    </Provider>)

    const nameInput = getByTestId("nameField");
    const locationInput = getByTestId("locationField");
    const latitudeInput = getByTestId("latitudeField");
    const longitudeInput = getByTestId("longitudeField");
    const submitButton = getAllByRole("button")[1];


    await act(async () => {
        fireEvent.click(submitButton)
    })

    let count = (container.innerHTML.match(/Polje je obavezno/g) || []).length;
    expect(count).toBe(6)

    await act(async () => {
        fireEvent.change(nameInput, { target: { value: "///" } })
        fireEvent.blur(nameInput)
    })

    await act(async () => {
        fireEvent.click(submitButton)
    })

    expect(container.innerHTML).toMatch("Polje smije sadržavati samo karaktere: A-Z, a-z, 0-9")
    //
    // await act(async () => {
    //     fireEvent.change(nameInput, { target: { value: "" } })
    //     fireEvent.blur(nameInput)
    // })
    //
    // await act(async () => {
    //     fireEvent.change(locationInput, { target: { value: "///" } })
    //     fireEvent.blur(locationInput)
    // })
    //
    // await act(async () => {
    //     fireEvent.click(submitButton)
    // })
    //
    // expect(container.innerHTML).toMatch("Polje smije sadržavati samo karaktere: A-Z, a-z, 0-9")
    //
    // await act(async () => {
    //     fireEvent.change(latitudeInput, { target: { value: "-90.1" } })
    //     fireEvent.blur(latitudeInput)
    // })
    //
    // await act(async () => {
    //     fireEvent.click(submitButton)
    // })
    //
    // expect(container.innerHTML).toMatch("Geografska širina je broj između -90 i 90")
    //
    // await act(async () => {
    //     fireEvent.change(longitudeInput, { target: { value: "200" } })
    //     fireEvent.blur(longitudeInput)
    // })
    //
    // await act(async () => {
    //     fireEvent.click(submitButton)
    // })
}, 20000)