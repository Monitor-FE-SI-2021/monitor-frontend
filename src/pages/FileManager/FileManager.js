import React from 'react';
import { connect } from "react-redux";
import "./FileManager.scss";
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';
const FileManagerView = () => {
  
  const apiOptions = {
    ...connectorNodeV1.apiOptions,
    apiRoot: `http://opuscapita-filemanager-demo-master.azurewebsites.net/` // Or you local Server Node V1 installation.
  }
    return (
    <div className="page file-manager">
      <div className="top">
        <h1> FileManager </h1>
      </div>
      <div>
        <FileManager>
          <FileNavigator
            id="filemanager-1"
            api={connectorNodeV1.api}
            apiOptions={apiOptions}
            capabilities={connectorNodeV1.capabilities}
            listViewLayout={connectorNodeV1.listViewLayout}
            viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
          />
        </FileManager>
      </div>
    </div>);
  }

    export default connect(state => ({}))(FileManagerView);
