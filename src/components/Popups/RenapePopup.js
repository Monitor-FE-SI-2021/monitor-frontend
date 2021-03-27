import React from 'react';
import './RenamePopup.css';

class RenamePopup extends React.Component {
    render() {
        return (
            <div className='rename-popup'>
                <div className='rename-popup-inner'>
                    <div className="upper-button"><button onClick={this.props.closePopupButton}>x</button></div>
                    <div className="rename-wrapper"><input type="text"/></div>
                    <div className="rename-wrapper"><button onClick={this.props.changeName}>Promijeni naziv</button></div>
                </div>
            </div>
        );
    }
}

export default RenamePopup;