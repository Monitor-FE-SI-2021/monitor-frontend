import React from 'react';
import './FileManagerTable.css';
import RenamePopup from "../Popups/RenapePopup";

class FileManagerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseObject: [
                {
                    id: 1,
                    fileName: "Prvi fajl",
                    link: 'linkDoFajla'
                },
                {
                    id: 2,
                    fileName: "Drugaciji naziv fajla",
                    link: 'drugiLink'
                },
                {
                    id: 3,
                    fileName: "Treci Fajl",
                    link: 'treciLink'
                },
                {
                    id: 4,
                    fileName: "Nesto novo",
                    link: 'linkDoFajla'
                },
                {
                    id: 5,
                    fileName: "Neki peti fajl",
                    link: 'drugiLink'
                },
                {
                    id: 6,
                    fileName: "Ovo je neki novi",
                    link: 'treciLink'
                },
                {
                    id: 7,
                    fileName: "Neki fajl",
                    link: 'linkDoFajla'
                },
                {
                    id: 8,
                    fileName: "Sprint 2",
                    link: 'drugiLink'
                },
                {
                    id: 9,
                    fileName: "Sprint 1",
                    link: 'treciLink'
                }
            ], showPopup: false, globalId: -1
        }
    }

    togglePopup(resetId) {
        this.setState({
            showPopup: !this.state.showPopup
        });
        if(resetId) {
            this.state.globalId = -1;
        }
    }

    sendChangeRequest() {
        let formField = document.getElementsByClassName('wrapper')[0].children[0].value;
        if(formField.length === 0) {
            console.log("Ne možete poslati prazan string!")
        } else {
            console.log("Naziv: " + formField + ", ID: " + this.state.globalId);
        }
        this.togglePopup(true);
    }

    renderTableHeader() {
        return (
            <tr>
                <th>ID</th>
                <th>Filename</th>
                <th colSpan="2">File manipulation</th>
            </tr>
        )
    }

    renderTableData() {
        return this.state.responseObject.map((oneObject,index) => {
            const { id, fileName, link } = oneObject;
            return (
                <tr>
                    <td className="id">{id}</td>
                    <td className="file-download" onClick={() => { this.handleClick(id) }} >{fileName}</td>
                    <td className="file-manipulation file-delete" onClick={() => { this.handleDelete(id) }}>Delete</td>
                    <td className="file-manipulation file-rename" onClick={() => { this.handleRename(id) }}>Rename</td>
                </tr>
            )
        })
    }

    handleClick(id) {
        console.log("Download file with id " + id);
    }

    handleDelete(id) {
        console.log("Delete file with id " + id);
    }

    handleRename(id) {
        this.state.globalId = id;
        this.togglePopup(false);
        console.log("rename " + id);
    }


    render() {
        return (
            <div className="table-wrapper">
                <table >
                    <tbody>
                    {this.renderTableHeader()}
                        {this.renderTableData()}
                    </tbody>
                </table>
                {this.state.showPopup ?
                    <RenamePopup className="popup"
                        text='Click "Close Button" to hide popup'
                        closePopupButton={this.togglePopup.bind(this)}
                           changeName={this.sendChangeRequest.bind(this)}
                    />
                    : null
                }
            </div>
        )
    }
}
export default FileManagerTable;