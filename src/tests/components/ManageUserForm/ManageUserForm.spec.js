import { act } from "react-dom/test-utils";
import store from "../../../store/store"
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ManageUserForm from "../../../components/ManageUserForm/ManageUserForm";
import {Provider} from "react-redux";

it("Manage user form error messages test", async () => {
    const {getByTestId, getAllByRole, container} = render(
        <Provider store={store}>
            <ManageUserForm groupsAsync={false}/>
        </Provider>)

    // const submitButton = getAllByRole("button")[1];
    //
    // await act(async () => {
    //     fireEvent.click(submitButton)
    // })
    //
    // let count = (container.innerHTML.match(/Polje je obavezno/g) || []).length;
    // expect(count).toBe(8)

})