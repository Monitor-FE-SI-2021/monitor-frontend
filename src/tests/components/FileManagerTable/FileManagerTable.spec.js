import { findByRole, findByText, getAllByTestId, render, screen, waitForElement } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import FileManagerTable from '../../../components/FileManagerTable/FileManagerTable';
import ReactDOM from "react-dom";
import store from '../../../store/store';
import TestRenderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event'

test("renders without crashing", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const div = document.createElement("div");
    ReactDOM.render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>, div
    );
}, 20000);

test("adding a folder", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    userEvent.click(getByText("New folder"));
    userEvent.type(getByRole("textbox"), "AAA-novi-test");
    userEvent.click(getByText("Add"));
    const confirmation = await waitForElement(() => getByText("OK"), {timeout: 20000});
    userEvent.click(confirmation);
    const newFolder = await waitForElement(() => getByText("AAA-novi-test"), {timeout: 20000});
    expect(newFolder.textContent).toBe("AAA-novi-test");
}, 20000);

test("renaming a folder", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );
        const folder = await waitForElement(() => getByText("AAA-novi-test"), {timeout: 20000});
        let options = getAllByTestId("fileRename");
        userEvent.click(options[0]);
        userEvent.type(getByRole("textbox"), "AAA-novi-test2")
        userEvent.click(getByText("Rename"));
        const confirmation = await waitForElement(() => getByText("OK"), {timeout: 20000});
        expect(getByText("File/folder renamed successfully").textContent).toBe("File/folder renamed successfully");
        userEvent.click(confirmation);
        const renamedFolder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
        expect(renamedFolder.textContent).toBe("AAA-novi-test2");
}, 20000);

test("sorting name descending", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    userEvent.click(getByTestId("sortNameDesc"));
    const sortedFolder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    expect(sortedFolder.textContent).toBe("AAA-novi-test2");
}, 20000);

test("sorting name ascending", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    userEvent.click(getByTestId("sortNameAsc"));
    const sortedFolder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    expect(sortedFolder.textContent).toBe("AAA-novi-test2");
}, 20000);

test("sorting date descending", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    userEvent.click(getByTestId("sortDateDesc"));
    const sortedFolder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    expect(sortedFolder.textContent).toBe("AAA-novi-test2");
}, 20000);

test("sorting date ascending", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    userEvent.click(getByTestId("sortDateAsc"));
    const sortedFolder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    expect(sortedFolder.textContent).toBe("AAA-novi-test2");
}, 20000);

test("clicking into folder", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    let folder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    userEvent.click(folder);
    let updatedPath = await waitForElement(() => getByText("./AAA-novi-test2"));
    expect(updatedPath.textContent).not.toBeNull();
});

test("mock moving folder", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    let folder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    let options = getAllByTestId("fileMove");
    userEvent.click(options[0]);
    let btnMove = await waitForElement(() => getByText("Move"), {timeout: 20000});
    userEvent.click(btnMove);
    let confirmation = await waitForElement(() => getByText("OK"), {timeout: 2000});
    expect(getByText("File/folder moved successfully").textContent).toBe("File/folder moved successfully");
    userEvent.click(confirmation);
});

test("mock copying folder", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );

    let folder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    let options = getAllByTestId("fileCopy");
    userEvent.click(options[0]);
    let btnMove = await waitForElement(() => getByText("Copy"), {timeout: 20000});
    userEvent.click(btnMove);
    let confirmation = await waitForElement(() => getByText("OK"), {timeout: 2000});
    expect(getByText("File/folder copied successfully").textContent).toBe("File/folder copied successfully");
    userEvent.click(confirmation);
});

test("deleting a folder", async () => {
    const user = {
        email: "whoso@whoso.com",
        userId: 1
    }
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <FileManagerTable user={user}></FileManagerTable>
        </Provider>
    );
    
    let folder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
    let options = getAllByTestId("fileDelete");
    userEvent.click(options[0]);
    let alertBtnDelete = await waitForElement(() => getByText("Yes, delete it!"), {timeout: 2000});
    userEvent.click(alertBtnDelete);
    const confirmation = await waitForElement(() => getByText("OK"), {timeout: 20000});
    expect(getByText("Your directory has been deleted.").textContent).toBe("Your directory has been deleted.");
    userEvent.click(confirmation);
}, 20000);

// test("moving a folder into another and deleting both in the end", async () => {
//     const user = {
//         email: "whoso@whoso.com",
//         userId: 1
//     }
//     const { getByText, getByRole, getByTestId, getAllByTestId } = render(
//         <Provider store={store}>
//             <FileManagerTable user={user}></FileManagerTable>
//         </Provider>
//     );

//     //kreiranje dva testna foldera
//     userEvent.click(getByText("New folder"));
//     userEvent.type(getByRole("textbox"), "AAA-novi-test");
//     userEvent.click(getByText("Add"));
//     let confirmation = await waitForElement(() => getByText("OK"), {timeout: 2000});
//     userEvent.click(confirmation);
//     let newFolder = await waitForElement(() => getByText("AAA-novi-test"), {timeout: 20000});
//     expect(newFolder.textContent).toBe("AAA-novi-test");

//     userEvent.click(getByText("New folder"));
//     userEvent.type(getByRole("textbox"), "AAA-novi-test2");
//     userEvent.click(getByText("Add"));
//     confirmation = await waitForElement(() => getByText("OK"), {timeout: 2000});
//     userEvent.click(confirmation);
//     newFolder = await waitForElement(() => getByText("AAA-novi-test2"), {timeout: 20000});
//     expect(newFolder.textContent).toBe("AAA-novi-test2");

//     //move-anje foldera
//     let options = getAllByTestId("fileMove");
//     userEvent.click(options[0]);
//     userEvent.type(getByRole("textbox"), "AAA-novi-test2")
//     userEvent.click(getByText("Move"));
//     confirmation = await waitForElement(() => getByText("OK"), {timeout: 2000});
//     expect(getByText("File/folder moved successfully").textContent).toBe("File/folder moved successfully");
//     userEvent.click(confirmation);
//     userEvent.click(getByText("AAA-novi-test2"));
//     const movedFolder = await waitForElement(() => getByText("AAA-novi-test"), {timeout: 2000});
//     expect(movedFolder.textContent).toBe("AAA-novi-test");
// }, 25000);

// test("cleanup test", async () => {
//     const user = {
//         email: "whoso@whoso.com",
//         userId: 1
//     }
//     const { getByText, getByRole, getByTestId, getAllByTestId } = render(
//         <Provider store={store}>
//             <FileManagerTable user={user}></FileManagerTable>
//         </Provider>
//     );

//     let options = getAllByTestId("fileDelete")
//     userEvent.click(options[0]);
//     let alertBtnDelete = await waitForElement(() => getByText("Yes, delete it!"), {timeout: 2000});
//     userEvent.click(alertBtnDelete);
//     let confirmation = await waitForElement(() => getByText("OK"), {timeout: 2500});
//     options = getAllByTestId("fileDelete")
//     userEvent.click(options[0]);
//     alertBtnDelete = await waitForElement(() => getByText("Yes, delete it!"), {timeout: 2000});
//     userEvent.click(alertBtnDelete);
//     confirmation = await waitForElement(() => getByText("OK"), {timeout: 2500});
//     userEvent.click(confirmation);
// });