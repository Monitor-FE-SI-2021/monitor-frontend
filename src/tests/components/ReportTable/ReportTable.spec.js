import store from "../../../store/store"
import ReportTable from "../../../components/ReportTable/ReportTable";
import { render, screen } from "@testing-library/react";

describe("Test teble", () => {
    it("Table name", () => {
        var report = {
            reportId : 0,
            name: "string",
            query: "string",
            frequency: "string",
            nextDate: "2021-05-04T13:58:51.010Z",
            sendEmail: true,
            deleted: false,
            userId: 0,
            reportInstances: [] };
        render(<ReportTable store={store} report={report} />);
        screen.getByText('Report name');
    });

    it("Table date", () => {
        var report = {
            reportId : 0,
            name: "Ime",
            query: "string",
            frequency: "Weekly",
            nextDate: "2021-05-04T13:58:51.010Z",
            sendEmail: true,
            deleted: false,
            userId: 0,
            reportInstances: [] };
        render(<ReportTable store={store} report={report}  />);
        screen.getByText('Date');
    });
    it("Table Frequency", () => {
        var report = {
            reportId : 0,
            name: "Ime",
            query: "string",
            frequency: "Weekly",
            nextDate: "2021-05-04T13:58:51.010Z",
            sendEmail: true,
            deleted: false,
            userId: 0,
            reportInstances: [] };
        render(<ReportTable store={store} report={report}  />);
        screen.getByText('Frequency');
    });
    it("Table download", () => {
        var report = {
            reportId : 0,
            name: "Ime",
            query: "string",
            frequency: "Weekly",
            nextDate: "2021-05-04T13:58:51.010Z",
            sendEmail: true,
            deleted: false,
            userId: 0,
            reportInstances: [] };
        render(<ReportTable store={store} report={report}  />);
        screen.getByText('Download');
    });
    it("Table no data", () => {
        var report = {
            reportId : 0,
            name: "Ime",
            query: "string",
            frequency: "Weekly",
            nextDate: "2021-05-04T13:58:51.010Z",
            sendEmail: true,
            deleted: false,
            userId: 0,
            reportInstances: [] };
        render(<ReportTable store={store} report={report}  />);
        screen.getByText('Nema rezultata.');
    });
});