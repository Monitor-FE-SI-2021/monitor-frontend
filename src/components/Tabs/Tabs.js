import { useState } from "react";
import { useMemo } from "react";
import "./Tabs.css";
import { connect } from "react-redux";
import request, { wsEndpoint } from "../../service";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import Swal from "sweetalert2";
import { Route, Switch, useParams } from "react-router";
import FileManagerTable from "../FileManagerTable/FileManagerTable";
import Terminal from "../Terminal/Terminal";

const Tabs = (props, machine) => {
  let { name, tab } = useParams();

  const toggleTab = (tab) => {
    props.history.push(
      "/remotecontrol/" + (name == undefined ? "0" : name) + "/" + tab
    );
  };

  const [url, setUrl] = useState("slkadhjaksl");

  const handleClick = async () => {
    try {
      var odgovor = await request(wsEndpoint + "/screenshot", "post", machine);

      setUrl(odgovor.data.message);
    } catch (err) {}
  };

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

  const onDrop = async (acceptedFiles) => {
    const base64file = await handleFileRead(acceptedFiles[0]);
    const base64FileString = base64file.substring(base64file.indexOf(",") + 1);
    let requestMessage = {
      name: "name",
      location: "location",
      ip: "string",
      fileName: acceptedFiles[0].name,
      base64Data: base64FileString,
      user: "username",
    };
    console.log(requestMessage);
    try {
      var odgovor = await request(
        wsEndpoint + "/web/file/put",
        "post",
        requestMessage
      );
      console.log(odgovor.data.message);
    } catch (err) {
      console.log(err);
    }
    Swal.fire({
      title: "File manager",
      text: "Datoteka uspješno poslana!",
      type: "success",
    });
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
  //console.log(JSON.stringify(machine));
  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={
            tab == undefined || tab === "terminal" ? "tabs active-tabs" : "tabs"
          }
          onClick={() => toggleTab("terminal")}
        >
          Terminal
        </button>
        <button
          className={tab === "screenshot" ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab("screenshot")}
        >
          Screenshot
        </button>
        <button
          className={tab === "filemanager" ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab("filemanager")}
        >
          File Manager
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={
            tab == undefined || tab === "terminal"
              ? "content  active-content"
              : "content"
          }
        >
          <div>
            <div>
              <div className="screenshot">
                <p>Terminal</p>

                <Terminal machine={props.machine} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            tab === "screenshot" ? "content  active-content" : "content"
          }
        >
          <div>
            <div>
              <div className="screenshot">
                <p>Screenshot</p>
                <img
                  alt="Asked image will appear here."
                  className="screenshot-img"
                  src={`data:image/jpeg;base64,${url}`}
                />
              </div>
            </div>
          </div>

          <button type="button" onClick={handleClick}>
            Get Screenshot
          </button>
        </div>
        <div
          className={
            tab === "filemanager" ? "content  active-content" : "content"
          }
        >
          <FileManagerTable></FileManagerTable>
          <div className="uploadArea">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p className="uploadText">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({}), {})(Tabs);
