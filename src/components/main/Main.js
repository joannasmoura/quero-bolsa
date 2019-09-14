import React from 'react';
import './Main.css';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    openModal = () =>{
        console.log('vai abrir modal');
    }
    
    render() {
        return(
            <div id="main">
                <Breadcrumbs/>
                <section id="texto-principal">
                    <h1>Bolsas Favoritas</h1>
                    <p>Adicione bolsas de cursos e faculdades do seu interesse e receba atualizações com as melhores ofertas disponíveis.</p>
                </section>
                <section id="semestres" className="center">
                    <button-group>
                        <button>Todos os Semestres</button>
                        <button>2º Semestre de 2019</button>
                        <button>1º Semestre de 2020</button>
                    </button-group>                
                </section>
                <section>
                    <div id="card" className="center" onClick={this.openModal}>
                        <div id="icon">
                            <FontAwesomeIcon className="icon-color" icon={faPlus} size="3x"/>
                        </div>
                        <div id="texto">
                            <h2>Adicionar bolsa</h2>
                            <h4>Clique para adicionar bolsas de cursos de seu interesse</h4>
                        </div>                    
                    </div>               
                </section>
            </div>
        )
    }
}

export default Main;
