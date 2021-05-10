import { act } from "react-dom/test-utils";
import store from "../../../store/store"
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ManageDeviceForm from "../../../components/ManageDeviceForm/ManageDeviceForm";
import { Provider } from "react-redux";

it("Manage device form error messages test", async () => {
    const { getAllByRole, container } = render(<Provider store={store}>
        <ManageDeviceForm/>
    </Provider>)

    const submitButton = getAllByRole("button")[1];


    await act(async () => {
        fireEvent.click(submitButton)
    })

    let count = (container.innerHTML.match(/Polje je obavezno/g) || []).length;
    expect(count).toBe(6)
}, 20000)