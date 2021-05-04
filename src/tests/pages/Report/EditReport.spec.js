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
});