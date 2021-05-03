import store from "../../../store/store"
import Reporting from "../../../pages/Reporting/Reporting";
import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";

describe("Test create report page", () => {
    it("Page name ", () => {
        render(
            <Provider store={store}>
                <Reporting />
            </Provider>)
        screen.getByText('Create Report');
    });

   
});