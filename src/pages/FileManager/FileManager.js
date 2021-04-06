import React from 'react';
import { connect } from "react-redux";
import "./FileManager.scss";
import FileManagerTable from '../../components/FileManagerTable/FileManagerTable';




const FileManagerView = () => {
  
    return (
      <div>
         <FileManagerTable></FileManagerTable>
      </div>
    
    );

}

export default connect(state => ({}))(FileManagerView);
