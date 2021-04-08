import React from 'react';
import './RenamePopup.css';

class RenamePopup extends React.Component {
    render() {
        return (
            <div id="rename-popup-wrapper">
                <div className='rename-popup'>
                    <div className='rename-popup-inner'>
                        <div className="upper-button"><button className="rename-close" onClick={this.props.closePopupButton}>x</button></div>
                        <div className="rename-wrapper"><input className="rename-input" type="text"/></div>
                        <div className="rename-wrapper"><button className="rename-button" onClick={this.props.changeName}>Promijeni naziv</button></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RenamePopup;