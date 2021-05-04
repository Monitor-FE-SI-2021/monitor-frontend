import store from "../../../store/store"
import AdminUsersTable from "../../../components/AdminUsersTable/AdminUsersTable";
import { render, screen } from "@testing-library/react";

describe("Test if table is rendered properly", () => {
    it("Should have name", () => {
        render(<AdminUsersTable store={store} />);
        screen.getByText('Ime');
    });
    it("Should have lastname", () => {
        render(<AdminUsersTable store={store} />);
        screen.getByText('Prezime');
    });
    it("Should be mail", () => {
        render(<AdminUsersTable store={store} />);
        screen.getByText('E-mail');
    });
    it("Should have group", () => {
        render(<AdminUsersTable store={store} />);
        screen.getByText('Grupa');
    });
    it("Should have roles", () => {
        render(<AdminUsersTable store={store} />);
        screen.getByText('Role');
    });
});
