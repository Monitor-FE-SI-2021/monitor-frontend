import React from 'react';
import './FileManagerTable.scss';
import request from "../../service";
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Checkbox from '@material-ui/core/Checkbox';


const config = require("../Terminal/config");
const userFiles = "https://si-grupa5.herokuapp.com/api/web/user/file-tree";
const folderIconUrl = "https://img.icons8.com/color/40/000000/folder-invoices--v2.png";
const fileIconUrl = "https://img.icons8.com/office/40/000000/document--v2.png";

class FileManagerTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            responseObject: [
                {
                    id: 0,
                    fileName: "LOADING...",
                    link: 'linkDoFajla',
                    data: {}
                },
            ],
            globalId: -1,
            activeFolder: '.',
            user: props.user,
            checkedFiles: []
        }
        this.getCheckedFiles = this.getCheckedFiles.bind(this)
        this.handleCheckFile = this.handleCheckFile.bind(this)
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

    renderTableHeader() {
        return (
            <tr className="header-row">
                {/* <th>ID</th> */}
                <th className="centriraj-lijevo pomjereni-naziv">Filename</th>
                <th colSpan="3" className="centriraj">File manipulation</th>
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
                    <div className="file-manipulation-wrapper">
                        <td className="file-manipulation file-delete centriraj" onClick={() => { this.handleDelete(id) }}>
                            <FaTrash size={20} />
                        </td>
                        <td className="file-manipulation file-rename centriraj" onClick={() => { this.handleRename(id) }}>
                            <FaPencilAlt size={20} />
                        </td>
                        <Checkbox onChange={(e) => { this.handleCheckFile(e, id)}} className="file-checkbox file-manipulation" color="default"/>
                    </div>
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

    sendFileDeleteRequest = async (name) => {
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
                        fileName: name,
                        user: this.state.user.email,
                        path: this.state.activeFolder
                    })
                };

                var response1 = await fetch('https://si-grupa5.herokuapp.com/api/web/user/file/delete', requestOptions2)
                    .then((res) => {
                        this.updateResponse();
                    }).catch((error) => {
                        console.log(error);
                    });
            }
        } catch (e) {
            console.log(e);
        }
    }

    sendFolderDeleteRequest = async (name) => {
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
                        folderName: name,
                        user: this.state.user.email,
                        path: this.state.activeFolder
                    })
                };

                var response1 = await fetch('https://si-grupa5.herokuapp.com/api/web/user/folder/delete', requestOptions2)
                    .then((res) => {
                        this.updateResponse();
                    }).catch((error) => {
                        console.log(error);
                    });
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDelete(id) {
        var file = this.state.responseObject[id];

        this.state.globalId = id;
        if(file.data.type === 'directory') {
            Swal.fire({
                title: 'Are you sure?',
                text: "The directory is not empty",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.sendFolderDeleteRequest(file.fileName)
                    Swal.fire(
                        'Deleted!',
                        'Your directory has been deleted.',
                        'success'
                    )
                }
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You cannot return the file after you delete it",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("delete file " + this.state.globalId)
                    this.sendFileDeleteRequest(file.fileName)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }

    }

    sendRenameRequest = async (oldFileName, newFileName, isDirectory) => {
        const fileSplit = oldFileName.split('.');
        let extension = '.'
        extension = extension.concat(fileSplit[fileSplit.length-1]);
        let finalName = newFileName.concat(extension);
        if(isDirectory) {
            finalName = newFileName;
        }
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
                        user: this.state.user.email,
                        path: this.state.activeFolder,
                        oldName: oldFileName,
                        newName: finalName
                    })
                };

                var response1 = await fetch('https://si-grupa5.herokuapp.com/api/web/user/rename', requestOptions2)
                    .then((res) => {
                        Swal.fire({
                            title: "File manager",
                            text: "File/folder renamed successfully",
                            type: "success",
                        });

                        this.updateResponse();

                    }).catch((error) => {
                        console.log(error);
                    });

            }
        } catch (e) {
            console.log(e);
        }
    }

    handleRename(id) {
        this.state.globalId = id;
        var file = this.state.responseObject[id];

        Swal.fire({
            title: 'Change file name',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Rename',
            showLoaderOnConfirm: true,
            preConfirm: (newName) => {
                if(newName.length === 0) {
                    Swal.showValidationMessage(
                        'File name cannot be empty!'
                    )
                } else {
                    let isDirectory = false;
                    if (file.data.type === 'directory') {
                        isDirectory = true;
                    }
                    this.sendRenameRequest(file.fileName, newName, isDirectory)
                        .then(r => console.log(r))
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    handleCheckFile(e, id) {
        let fileList = this.state.checkedFiles
        let availableFiles = this.state.responseObject;
        let selectedFile = availableFiles.find(ele => ele.id == id)

        if(e.target.checked) {
            fileList.push(selectedFile);
        }
        else {
            for( let i = 0; i < fileList.length; i++){
                if ( fileList[i].id === id) {
                    fileList.splice(i, 1);
                }
            }
        }
        this.state.checkedFiles = fileList;
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

                return await fetch('https://si-grupa5.herokuapp.com/api/web/user/file/get-text', requestOptions2)
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

    getCheckedFiles() {
        const sendFiles = this.state.checkedFiles;
        console.log(JSON.stringify(sendFiles));
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
                </div>
                <DragAndDrop updateView={this.updateResponse} activePath={this.state.activeFolder} user={this.state.user}></DragAndDrop>
            </div>
        )
    }
}
export default FileManagerTable;