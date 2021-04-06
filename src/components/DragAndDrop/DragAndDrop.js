import { useState } from "react";
import { useMemo } from "react";
import { connect } from "react-redux";
import request, { wsEndpoint } from "../../service";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import Swal from "sweetalert2";
import { Route, Switch, useParams } from "react-router";
import FileManagerTable from "../FileManagerTable/FileManagerTable";
import Terminal from "../Terminal/Terminal";
import config from "../Terminal/config";

const DragAndDrop = (props) => {

    const [requestMessage, setRequestMessage] = useState({
        "name": "name",
        "location": "location",
        "ip": "string",
        "fileName": "some file name",
        "base64Data": "some file data",
        "user": "username"
    });

    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "80px",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#eeeeee",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "border .24s ease-in-out",
      };
    
      const activeStyle = {
        borderColor: "#2196f3",
      };
    
      const acceptStyle = {
        borderColor: "#00e676",
      };
    
      const rejectStyle = {
        borderColor: "#ff1744",
      };

      const onDrop = async (acceptedFiles) => {
        const base64file = await handleFileRead(acceptedFiles[0]);
        const base64FileString = base64file.substring(base64file.indexOf(",") + 1);
        let requestMessageJson = JSON.stringify({
            fileName: acceptedFiles[0].name,
            base64Data: base64FileString,
            user: props.user.email,
            path : "/foldercic/"
        });
    
        //this is used to re-render table of files with the newly added file
        setRequestMessage(requestMessageJson);
        console.log(JSON.parse(requestMessageJson))

        /*
        try {
            var odgovor = await request(wsEndpoint + "/web/user/file/put", "post", requestMessageJson);
            console.log(odgovor.data.message);
        } catch (err) {
            console.log(err);
        }
        */
        
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

                const requestOptions2 = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        fileName: acceptedFiles[0].name,
                        base64: base64FileString,
                        user: props.user.email,
                        path : props.activePath
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

                    props.updateView();

                }).catch((error) => {
                    console.log(error);
                }); 
                console.log(response1);
    
            }
        } catch(e){
            console.log(e);
        }

      };

      const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      } = useDropzone({ onDrop });


      const style = useMemo(
        () => ({
          ...baseStyle,
          ...(isDragActive ? activeStyle : {}),
          ...(isDragAccept ? acceptStyle : {}),
          ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
      );
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    
      const handleFileRead = async (sendFile) => {
        const file = sendFile;
        const base64 = await convertBase64(file);
        return base64;
      };
       



    return (
    <div className="uploadArea">
        <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="uploadText">
            Drag 'n' drop some files here, or click to select files
        </p>
        </div>
    </div>
    )
}

export default connect((state) => ({}), {})(DragAndDrop);