import store from "../../../store/store"
import DeviceGroup from "../../../components/DeviceGroup/DeviceGroup";
import { render, screen } from "@testing-library/react";

describe("Test if table is rendered properly", () => {
    it("Should have + mašina", () => {
        render(<DeviceGroup store={store} group={{subGroups:[]}} />);
        screen.getByText('+ Mašina');
    });

    it("Should have + grupa", () => {
        render(<DeviceGroup store={store} group={{subGroups:[]}} />);
        screen.getByText('+ Grupa');
    });
});
