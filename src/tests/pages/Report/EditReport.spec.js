import store from "../../../store/store"
import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";
import EditReport from "../../../pages/EditReport/EditReport";

describe("Test edit report page", () => {
    it("Page name ", () => {
        render(
            <Provider store={store}>
                <EditReport />
            </Provider>)
        screen.getByText('Edit Report');
    });

    it("Page loader ", () => {
      render(
          <Provider store={store}>
              <EditReport  />
          </Provider>)
      screen.getByText('Loading...');
    });

    // it("Report title ", async () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('Report title:');
    // });

    // it("Send email ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('Do you want to be send an email with this report?');
    // });

    // it("Current Frequency: ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('Current Frequency:');
    // });

    // it("Current Time: ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('Current Time:');
    // });

    // it("Edit time ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('CHANGE TIME');
    // });

    // it("Edit query ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('CHANGE GROUP');
    // });

    // it("Show query ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('Query:');
    // });

    // it("Submit button ", () => {
    //   render(
    //       <Provider store={store}>
    //           <EditReport />
    //       </Provider>)
    //   screen.getByText('Submit');
    // });
});