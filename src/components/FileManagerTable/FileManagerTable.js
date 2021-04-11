import React, { useEffect } from 'react';
import './FileManagerTable.scss';
import request from "../../service";
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import Swal from "sweetalert2";
import { FaCopy, FaCut, FaPencilAlt, FaTrash } from "react-icons/fa";
import Checkbox from '@material-ui/core/Checkbox';
import {fetchAllGroups} from '../../store/modules/groups/actions';

const config = require("../Terminal/config");
const userFiles = "https://si-grupa5.herokuapp.com/api/web/user/file-tree";
const folderIconUrl = "https://img.icons8.com/color/40/000000/folder-invoices--v2.png";
const fileIconUrl = "https://img.icons8.com/office/40/000000/document--v2.png";

let tokenGlobal = '';
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
                tokenGlobal = token;
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
                        <td className="file-manipulation file-copy centriraj" onClick={() => { this.handleCopy(id) }}>
                            <FaCopy size={20} />
                        </td>
                        <td className="file-manipulation file-move centriraj" onClick={() => { this.handleMove(id) }}>
                            <FaCut size={20} />
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

    checkIfDirectoryIsEmpty = async(path) => {
        const requestOptions1 = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokenGlobal,
            },
            body: JSON.stringify({
                user: this.state.user.email,
            }),
        };

        var response = await fetch(userFiles, requestOptions1);
        if(response.status == 200) {
            var data = await response.json();
            var files = data.children;
            for (var i = 1; i < path.length; i++) {
                for (var j = 0; j < files.length; j++) {
                    if (path[i] == files[j].name && files[j].type == 'directory') {
                        files = files[j].children;
                    }
                }
            }
            //if folder has nothing inside, return true
            if (files.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    handleDelete = async (id) => {
        var file = this.state.responseObject[id];
        var directoryPath = this.state.activeFolder + '/' + file.data.name;
        var path = directoryPath.trim('/').split('/');

        this.state.globalId = id;
        if(file.data.type === 'directory') {
            let isDirectoryEmpty = false;
            let popupText = '';
            await this.checkIfDirectoryIsEmpty(path)
                .then(r => isDirectoryEmpty = r)

            if(isDirectoryEmpty) {
                popupText = 'The directory is empty'
            } else {
                popupText = 'The directory is not empty'
            }
            Swal.fire({
                title: 'Are you sure?',
                text: popupText,
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

    

  sendCopyRequest = async (newPath, name) => {
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
            oldPath: this.state.activeFolder,
            name: name,
            newPath: newPath,
          }),
        };

        var response1 = await fetch(
          "https://si-grupa5.herokuapp.com/api/web/user/copy",
          requestOptions2
        )
          .then((res) => {
            Swal.fire({
              title: "File manager",
              text: "File/folder copied successfully",
              type: "success",
            });

            this.updateResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  sendMoveRequest = async (newPath, name) => {
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
            oldPath: this.state.activeFolder,
            name: name,
            newPath: newPath,
          }),
        };

        var response1 = await fetch(
          "https://si-grupa5.herokuapp.com/api/web/user/move",
          requestOptions2
        )
          .then((res) => {
            Swal.fire({
              title: "File manager",
              text: "File/folder copied successfully",
              type: "success",
            });

            this.updateResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  
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

    handleCopy(id) {
      this.state.globalId = id;
      var file = this.state.responseObject[id];
  
      Swal.fire({
        title: "Copy file",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Copy",
        showLoaderOnConfirm: true,
        preConfirm: (newPath) => {
          let isDirectory = false;
          if (file.data.type === "directory") {
            isDirectory = true;
          }
          this.sendCopyRequest(newPath, file.fileName).then((r) =>
            console.log(r)
          );
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
  
    handleMove(id) {
      this.state.globalId = id;
      var file = this.state.responseObject[id];
  
      Swal.fire({
        title: "Move file",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Move",
        showLoaderOnConfirm: true,
        preConfirm: (newPath) => {
          let isDirectory = false;
          if (file.data.type === "directory") {
            isDirectory = true;
          }
          this.sendMoveRequest(newPath, file.fileName).then((r) =>
            console.log(r)
          );
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
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

    /*constructSwalItem(grupa) {
        return (
            
        );
    }*/


    async sendToAgents() {
        
        console.log("KLIKNO SE");

        const url = 'https://si-2021.167.99.244.168.nip.io/api/group/MyAssignedGroups';
        var arrayOfGroups = [];
        
        const response = await request(url, 'GET');
        
        arrayOfGroups = response.data.data.subGroups;

        var html = '<div class="swal-text">';
        
        for(var i = 0; i < arrayOfGroups.length; i++) {
            html = html + this.getTableForGroups(arrayOfGroups[i]);

        }
        

        html = html + '</div>';
       

        Swal.fire({
            html: html.toString(),
            width: '50%'
        })
    }

    getTableForGroups(group) {
        
        
        var html = '';
        if( typeof group.subGroups !== 'undefined' && group.subGroups.length > 0) {
            html = html + '<div >';
            for(var i = 0; i < group.subGroups.length; i++) {
            html = html + this.getTableForGroups(group.subGroups[i]);
        }
        html = html + '</div>';

        }
        else {
        html = '<div class="swalItem">';
        html = html + '<div class="form-check">';
        html = html + `<label class="form-check-label" for="${group.groupId}">`
        html = html + group.name;
        html = html + "</label>";
        html = html + `<input class="form-check-input " type="checkbox" value="" id="${group.groupId}">`;
        html = html + "</div>";
        
        }
        
        return html;
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
                <button onClick={() => this.sendToAgents()}>Odaberi grupe</button>
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