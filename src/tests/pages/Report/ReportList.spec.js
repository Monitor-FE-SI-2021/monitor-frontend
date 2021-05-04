import store from "../../../store/store"
import ReportList from "../../../pages/Reporting/ReportList";
import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";

describe("Test report table page", () => {
    it("Page name", () => {
        render(
            <Provider store={store}>
                <ReportList />
            </Provider>)
        screen.getByText('Report List');
    });

    it("Page filter", () => {
        render(
            <Provider store={store}>
                <ReportList />
            </Provider>)
        screen.getByText('Filter');
    });

    it("Page reset filter", () => {
        render(
            <Provider store={store}>
                <ReportList />
            </Provider>)
        screen.getByText('Reset filters');
    });

    it("New report button", () => {
        render(
            <Provider store={store}>
                <ReportList />
            </Provider>)
        screen.getByText('New report');
    });

    it("New report buttonff", () => {
        render(
            <Provider store={store}>
                <ReportList />
            </Provider>)
        screen.getByText('No results');
    });

});

