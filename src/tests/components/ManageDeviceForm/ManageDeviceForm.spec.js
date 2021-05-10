import { act } from "react-dom/test-utils";
import store from "../../../store/store"
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ManageDeviceForm from "../../../components/ManageDeviceForm/ManageDeviceForm";

it("Manage device form error messages test", async () => {
    const { getByTestId, getAllByRole, container } = render(<ManageDeviceForm store={store}/>)

    const nameInput = getByTestId("nameField");
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
}, 20000)