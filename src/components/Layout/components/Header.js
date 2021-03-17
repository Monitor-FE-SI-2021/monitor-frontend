import React from 'react';
import classnames from 'classnames';
import NavDrawer from './NavDrawer';

function Header({ style, className }) {
    return (
        <div className={classnames('header', className)} style={style}>
            <NavDrawer/>
        </div>
    );
}

export default Header;