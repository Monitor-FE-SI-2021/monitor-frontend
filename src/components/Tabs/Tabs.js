import { useState } from "react";
import {useMemo} from "react";
import "./Tabs.css";
import { connect } from "react-redux";
import request, { wsEndpoint } from "../../service";
import {useDropzone} from "react-dropzone";
import React, {useCallback} from "react";
import Swal from "sweetalert2"

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [url, setUrl] = useState("slkadhjaksl");

  const handleClick = async () => {
    try {
      var odgovor = await request(wsEndpoint + '/screenshot',
          "post",
          { name: 'DESKTOP-SCC', location: 'Sarajevo - SCC' });

      setUrl(odgovor.data.message);
    } catch (err) {
    }
  }
  
    const baseStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '80px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out'
    };
    
    const activeStyle = {
      borderColor: '#2196f3'
    };
    
    const acceptStyle = {
      borderColor: '#00e676'
    };
    
    const rejectStyle = {
      borderColor: '#ff1744'
    };  

  const onDrop = useCallback(acceptedFiles => {
    //SEND FILES TO SERVER FROM HERE!
    Swal.fire({
      title: "File manager",
      text: "You have successfully uploaded your file!",
      type: "success"
    });
  }, []);  

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Screenshot
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          File Manager
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div>
                <p className="paragraph1">Quick example</p>
                <div>
                    <div className="screenshot">
                        <p>Screenshot</p>
                        <img alt="Asked image will appear here."
                             className='screenshot-img'
                             src={`data:image/jpeg;base64,${url}`}/>
                    </div>
                </div>
            </div>

            <button type="button" onClick={handleClick}>
                Get Screenshot
            </button>
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <div className="uploadArea">
            <div {...getRootProps({style})}>
              <input {...getInputProps()} />
              <p className="uploadText">Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
