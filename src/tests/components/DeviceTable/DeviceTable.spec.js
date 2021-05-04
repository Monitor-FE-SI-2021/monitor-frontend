import store from "../../../store/store"
import DeviceTable from "../../../components/DeviceTable/DeviceTable";
import { render, screen } from "@testing-library/react";

describe("Test if table is rendered properly", () => {
    it("Should have Naziv", () => {
        render(<DeviceTable store={store} devices={[]} />);
        screen.getByText('Naziv');
    });

});
