import React from 'react';
import './DeletePopup.css';

class DeletePopup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <p>Jeste li sigurni da želite izbrisati datoteku?</p>
                    <div className="inner-wrapper">
                        <div className="wrapper"><button onClick={this.props.changeName}>Da</button></div>
                        <div className="wrapper"><button onClick={this.props.closeDeletePopupButton}>Ne</button></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeletePopup;