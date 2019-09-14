import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo-querobolsa.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

function Header() {
    return (
        <span>
            <header>
                <div>                
                    <FontAwesomeIcon icon={faInfo} className="icon-size"/>                
                    <p>Ajuda</p>
                </div>
                <span></span>
                <div className="logo-container">
                    <img src={logo} className="logo" alt="logo" />
                </div>
                <span></span>
                <div>
                    <FontAwesomeIcon icon={faUserCircle} className="icon-size"/>
                    <p>Conta</p>
                </div>
            </header>
            <div className="breadcrumbs">
                <div>Minha conta</div>
                <div className="right">Menu <FontAwesomeIcon icon={faChevronDown} iconSize="xs"/></div>  
            </div>
        </span>        
    );
}

export default Header;
