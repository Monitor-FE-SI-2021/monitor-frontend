import React from 'react';
import './FileManagerTable.css';
import RenamePopup from "../Popups/RenapePopup";
import DeletePopup from "../Popups/DeletePopup";

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
            ], showRenamePopup: false, showDeletePopup: false, globalId: -1
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentFile !== this.props.currentFile) {
            this.state.responseObject.push({
                id: this.state.responseObject[this.state.responseObject.length-1].id+1,
                fileName: nextProps.currentFile.fileName,
                link: "testLink"
            });
        }
    }

    toggleRenamePopup(resetId) {
        this.setState({
            showRenamePopup: !this.state.showRenamePopup
        });
        if(resetId) {
            this.state.globalId = -1;
        }
    }

    toggleDeletePopup(resetId) {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup
        });
        if(resetId) {
            this.state.globalId = -1;
        }
    }

    sendChangeRequest() {
        let formField = document.getElementsByClassName('rename-wrapper')[0].children[0].value;
        if(formField.length === 0) {
            console.log("Ne možete poslati prazan string!")
        } else {
            console.log("Naziv: " + formField + ", ID: " + this.state.globalId);
        }
        this.toggleRenamePopup(true);
    }

    sendDeleteRequest() {
        console.log("Delete, ID: " + this.state.globalId);
        this.toggleDeletePopup(true);
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
        this.state.globalId = id;
        this.toggleDeletePopup(false);
    }

    handleRename(id) {
        this.state.globalId = id;
        this.toggleRenamePopup(false);
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
                {this.state.showRenamePopup ?
                    <RenamePopup className="rename-popup"
                        closePopupButton={this.toggleRenamePopup.bind(this)}
                           changeName={this.sendChangeRequest.bind(this)}
                    />
                    : null
                }
                {this.state.showDeletePopup ?
                    <DeletePopup className="delete-popup"
                        closeDeletePopupButton={this.toggleDeletePopup.bind(this)}
                           changeName={this.sendDeleteRequest.bind(this)}
                    />
                    : null
                }
                
            </div>
        )
    }
}
export default FileManagerTable;