import React from 'react';
import './Breadcrumbs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function Breadcrumbs() {
    return(
        <div id="breadcrumbs"> 
            <div id="icon"><FontAwesomeIcon icon={faChevronLeft}/></div>
            <div>Minha Conta</div>
        </div>
    )
}

export default Breadcrumbs;
