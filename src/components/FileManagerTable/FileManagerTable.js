import React from 'react';
import './FileManagerTable.scss';
import RenamePopup from "../Popups/RenapePopup";
import DeletePopup from "../Popups/DeletePopup";
import request from "../../service";
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import Swal from "sweetalert2";


const config = require("../Terminal/config");
const userFiles = "https://si-grupa5.herokuapp.com/api/web/user/fileList";
const folderIconUrl = "https://img.icons8.com/color/40/000000/folder-invoices--v2.png";
const fileIconUrl = "https://img.icons8.com/office/40/000000/document--v2.png";

class FileManagerTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            responseObject: [
                {
                    id: 1,
                    fileName: "LOADING...",
                    link: 'linkDoFajla',
                    data: {}
                },
            ],
            showRenamePopup: false,
            showDeletePopup: false,
            globalId: -1,
            activeFolder: '.',
            user: props.user
        }

        this.updateResponse();
    }

    updateResponse = async () => {

        console.log(this.state.user);

        console.log('I live');
        var path_arr = this.state.activeFolder.trim('/').split('/');
        console.log(path_arr);
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: config.email,
                    password: config.password,
                }),
            };

            var response = await fetch(config.url, requestOptions);
            if (response.status == 200) {
                var x = await response.json();
                const token = x.accessToken;
                const requestOptions1 = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        user: this.state.user.email,
                    }),
                };

                var response = await fetch(userFiles, requestOptions1)
                    .then((res) => {
                        console.log(res.json().then(data => {

                            // Dobio djecu
                            console.log(data);
                            var files = data.children;

                            for (var i = 1; i < path_arr.length; i++) {
                                console.log(path_arr[i]);
                                for (var j = 0; j < files.length; j++) {
                                    console.log('---' + files[j].name);
                                    if (path_arr[i] == files[j].name && files[j].type == 'directory') {
                                        files = files[j].children;
                                        console.log('EVOMEEEEEEE')
                                        break;
                                    }
                                }
                            }


                            //Redndera dejcu
                            files = files.map((file, index) => {
                                return {
                                    id: index,
                                    fileName: file.name,
                                    link: file.path,
                                    data: file
                                }
                            });

                            this.setState({ responseObject: files });
                        }));
                    }).catch((error) => {
                        console.log(error);
                    });



            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentFile !== this.props.currentFile) {
            this.state.responseObject.push({
                id: this.state.responseObject[this.state.responseObject.length - 1].id + 1,
                fileName: nextProps.currentFile.fileName,
                link: "testLink"
            });
        }
    }

    toggleRenamePopup(resetId) {
        this.setState({
            showRenamePopup: !this.state.showRenamePopup
        });
        if (resetId) {
            this.state.globalId = -1;
        }
    }

    toggleDeletePopup(resetId) {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup
        });
        if (resetId) {
            this.state.globalId = -1;
        }
    }

    sendChangeRequest() {
        let formField = document.getElementsByClassName('rename-wrapper')[0].children[0].value;
        if (formField.length === 0) {
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
            <tr className="header-row">
                {/* <th>ID</th> */}
                <th className="centriraj-lijevo pomjereni-naziv">Filename</th>
                <th colSpan="2" className="centriraj">File manipulation</th>
            </tr>
        )
    }

    renderTableData() {
        return this.state.responseObject.map((oneObject, index) => {
            const { id, fileName, link } = oneObject;
            return (
                <tr>
                    {/* <td className="id">{id}</td> */}
                    <td className="file-download pomjereni-naziv file-icon" onClick={() => { this.handleClick(id) }} >
                        <img className="file-icon" src={oneObject.data.type == "file" ? fileIconUrl : folderIconUrl}></img>
                        {fileName}
                    </td>
                    <td className="file-manipulation file-delete centriraj" onClick={() => { this.handleDelete(id) }}>Delete</td>
                    <td className="file-manipulation file-rename centriraj" onClick={() => { this.handleRename(id) }}>Rename</td>
                </tr>
            )
        })
    }

    handleClick = async (id) => {
        //#region Help ako treba neki request poslat TODO
        /*aaaaaa
        try{
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: config.email,
                  password: config.password,
                }),
              };
      
            var response = await fetch(config.url, requestOptions);
            if(response.status == 200)
            {
                var x = await response.json();
                const token = x.accessToken;
                const requestOptions1 = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                    user: config.email,
                    }),
                };

                const requestOptions2 = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        user: config.email,
                        base64Data : "string",
                        fileName : "test"+this.state.responseObject.length+".txt",
                        path : "/"
                    }),
                };
    
                console.log("Download file with id " + id);
                var response = await fetch(userFiles, requestOptions1)
                .then((res) => {
                    console.log(res.json());
                }).catch((error) => {
                    console.log(error);
                }); 
                
                console.log(response);

                
                var response1 = await fetch('https://si-grupa5.herokuapp.com/api/web/user/file/put', requestOptions2)
                .then((res) => {
                    console.log(res.json());
                }).catch((error) => {
                    console.log(error);
                }); 
                console.log(response1);
    
            }
        } catch(e){
            console.log(e);
        }
        //*/
        //#endregion

        var file = this.state.responseObject[id];
        if (file.data.type == 'file') {
            if(file.data.extension != '.txt') return;

            //Kliknut file
            console.log("Ja sam file prikazi me");

            var text = await this.getText(file);
            
            var myWindow = window.open("", "textFeild", "width=600,height=600");
            myWindow.document.open();
            myWindow.document.write(text);
        } else {
            //Kliknut folder
            console.log("Ja sam folder otvori me");

            this.state.activeFolder += '/' + file.data.name;
            console.log(this.state.activeFolder);
            this.updateResponse();
        }
    }

    handleDelete(id) {
        this.state.globalId = id;
        this.toggleDeletePopup(false);
    }

    handleRename(id) {
        this.state.globalId = id;
        this.toggleRenamePopup(false);
    }

    clickUp() {
        this.state.activeFolder = this.state.activeFolder.split('/').slice(0, -1).join('/');
        this.updateResponse();
    }

    addFolder = async (newFolder) => {

        this.state.activeFolder += '/' + newFolder;

        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: config.email,
                    password: config.password,
                }),
            };

            var response = await fetch(config.url, requestOptions);
            if (response.status == 200) {
                var x = await response.json();
                const token = x.accessToken;

                const requestOptions2 = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        fileName: 'new.file',
                        base64: '',
                        user: this.state.user.email,
                        path: this.state.activeFolder
                    })
                };

                var response1 = await fetch('https://si-grupa5.herokuapp.com/api/web/user/file/put', requestOptions2)
                    .then((res) => {
                        console.log(res.json());

                        Swal.fire({
                            title: "File manager",
                            text: "Datoteka uspješno poslana!",
                            type: "success",
                        });

                        this.updateResponse();

                    }).catch((error) => {
                        console.log(error);
                    });
                console.log(response1);

            }
        } catch (e) {
            console.log(e);
        }

    }

    getText = async (file) => {
        var returnable = null;
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: config.email,
                    password: config.password,
                }),
            };

            var response = await fetch(config.url, requestOptions);
            if (response.status == 200) {
                var x = await response.json();
                const token = x.accessToken;

                const requestOptions2 = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        fileName: file.fileName,
                        user: this.state.user.email,
                        path: this.state.activeFolder
                    })
                };

                return await fetch('https://si-grupa5.herokuapp.com/api/web/user/file/getText', requestOptions2)
                    .then((res) => {
                        return res.json().then((res) => {
                            console.log(res.text);
                            returnable = res.text;
                            return res.text;
                        });

                    }).catch((error) => {
                        console.log(error);
                    });



            }
        } catch (e) {
            console.log(e);
        }


    }

    clickNewFolder() {
        console.log("Napravi novi folder");



        Swal.fire({
            title: 'New folder name:',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            preConfirm: newFolder => {
                //console.log(newFolder);
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        })
            .then((result) => {
                if (result.isConfirmed) {
                    this.addFolder(result.value);
                }
            })


        return
        /*
        //#region Dodavanje praznog fajla u novi folder
        
        //#endregion
        */
    }

    render() {
        return (
            <div>
                <button onClick={() => this.clickUp()} disabled={this.state.activeFolder == '.' ? "disabled" : ""}>Go UP</button>
                <button onClick={() => this.clickNewFolder()} >New folder</button>
                <button disabled="disabled">{this.state.activeFolder}</button>
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
                <DragAndDrop updateView={this.updateResponse} activePath={this.state.activeFolder} user={this.state.user}></DragAndDrop>
            </div>
        )
    }
}
export default FileManagerTable;