import React from 'react';
import { connect } from "react-redux";
import "./FileManager.scss";
import FileManagerTable from '../../components/FileManagerTable/FileManagerTable';




const FileManagerView = ({ user }) => {
  
    return (
      <div>
         <FileManagerTable user={user}></FileManagerTable>
      </div>
    
    );

}

//export default connect(state => ({}))(FileManagerView);

export default connect(
  (state) => ({
      user: state.login.user,
  }),
)(FileManagerView);