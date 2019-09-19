import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faComments, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (        
        <footer>            
            <div id="contato">
                <div id="icon">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x"/>
                </div>
                <div id="info">
                    <div className="f-700">0800 123 222</div>
                    <div>Segunda a sexta de 8h às 22h</div>
                </div>
            </div>
            <div id="chat" className="center">
                <div className="icon mb-5"><FontAwesomeIcon icon={faComments} size="2x"/></div>                
                <div className="f-600 mb-10">Chat</div>
            </div>

            <div id="email" className="center">
                <div className="icon mb-5"><FontAwesomeIcon icon={faEnvelope} size="2x"/></div>                
                <div className="f-600 mb-10">E-mail</div>
            </div>

            <div id="ajuda" className="center">
                <div className="icon mb-5"><FontAwesomeIcon icon={faInfo} size="2x"/></div>            
                <div className="f-600 mb-10">Ajuda</div>
            </div>

            <div id="dedicatoria" className="center">
                <p className="f-600">Feito com <FontAwesomeIcon icon={faHeart}/> por Quero Educação</p>
            </div>
        </footer>        
    );
}

export default Footer;
