import {render, screen} from "@testing-library/react";
import AdminPanel from "../../../pages/AdminPanel/AdminPanel";
import store from "../../../store/store";
import {Provider} from "react-redux";

describe("Test if panel is rendered properly", () => {
    it("Should have korisnici", () => {
        render(
            <Provider store={store}>
                <AdminPanel />
            </Provider>
        )
        screen.getByText('Korisnici');
    });
    it("Should have kreiraj korisnika", () => {
        render(
            <Provider store={store}>
                <AdminPanel />
            </Provider>
        )
        screen.getByText('Kreiraj korisnika');
    });
    it("Should have pretraži korisnike", () => {
        render(
            <Provider store={store}>
                <AdminPanel />
            </Provider>
        )
        screen.getAllByText('Pretraži korisnike');
    });
});
