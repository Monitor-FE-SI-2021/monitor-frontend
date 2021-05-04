import store from "../../../store/store"
import Reports from "../../../pages/Reporting/Reporting";
import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";

describe("Test create report page", () => {
    it("Page name ", () => {
        render(
            <Provider store={store}>
                <Reports />
            </Provider>)
        screen.getByText('Create Report');
    });

    it("Report title ", () => {
      render(
          <Provider store={store}>
              <Reports />
          </Provider>)
      screen.getByText('Report title:');
    });

    it("Send email ", () => {
      render(
          <Provider store={store}>
              <Reports />
          </Provider>)
      screen.getByText('Do you want to be send an email with this report?');
    });

    it("Time ", () => {
      render(
          <Provider store={store}>
              <Reports />
          </Provider>)
      screen.getByText('Time:');
    });

    it("Undo button ", () => {
      render(
          <Provider store={store}>
              <Reports />
          </Provider>)
      screen.getByText('Undo');
    });

    it("Query builder ", () => {
      render(
          <Provider store={store}>
              <Reports />
          </Provider>)
      screen.getByText('What do you want in your report?');
    });

    it("Submit button ", () => {
      render(
          <Provider store={store}>
              <Reports />
          </Provider>)
      screen.getByText('Submit');
    });
});