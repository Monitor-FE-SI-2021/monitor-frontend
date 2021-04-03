import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import menuIcon from '../../../assets/icons/menu.png';
import { setMenuExpanded } from "../../../store/modules/menu/menu";
import { STORAGE_KEY } from "../../../utils/consts";
import { RouteLink } from "../../../store/modules/menu/menu";
import classnames from "classnames";

function NavDrawer({ push, menuItems, isMenuExpanded, setMenuExpanded, user }) {

    const doLogout = () => {
        localStorage.removeItem(STORAGE_KEY);
        push('/login');
    }

    const switchRoute = (link) => {
        push(link);
    };

    const getUsername = () => {
        return user ? user.name + " " + user.lastname : '';
    }

    return (
        <div className='menu'>
            <div className='app-title'>
                {isMenuExpanded && <span>Monitor</span>}
                <img src={menuIcon} onClick={() => setMenuExpanded(!isMenuExpanded)}/>
            </div>
            <div>
                {isMenuExpanded && menuItems
                    .map((item, i) => {
                        return (
                            <div className='menu-item'
                                 key={i}
                                 id={i}
                                 onClick={() => switchRoute(item.link)}>
                                {item.name}
                            </div>
                        );
                    })}
            </div>
            <div className={classnames({ 'username': true, 'hidden': !isMenuExpanded })}>
                {getUsername()}
            </div>
            <div onClick={doLogout} className='menu-item'>
                Logout
            </div>
        </div>
    );
}

export default connect(state => {
    return {
        menuItems: state.menu.items,
        user: state.login.user,
        isMenuExpanded: state.menu.isMenuExpanded,
        access_level: 0,    // TODO
    };
}, { push, setMenuExpanded })(NavDrawer);
