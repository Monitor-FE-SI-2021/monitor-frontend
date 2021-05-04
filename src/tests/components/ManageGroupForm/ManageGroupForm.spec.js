import { act } from "react-dom/test-utils";
import store from "../../../store/store"
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ManageGroupForm from "../../../components/ManageGroupForm/ManageGroupFrom";

it("Manage group form error messages test", async () => {
    const {getByTestId, getAllByRole, container} = render(<ManageGroupForm store={store}/>)

    const submitButton = getAllByRole("button")[1];

    await act(async () => {
        fireEvent.click(submitButton)
    })

    let count = (container.innerHTML.match(/This field is required/g) || []).length;
    expect(count).toBe(1)

})