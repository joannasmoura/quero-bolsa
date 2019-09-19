import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


class Modal extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {   
            presencial: true, 
            distancia: true,
            valor: 10000, 
            cidades:[],
            cidadeSelecionada:'', 
            escolhidos:[]
        };
    }
    
    closeModal = e =>{        
        this.props.handleClose();
    }

    handleInputChange = (event) => {
        let state = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        state[name] = value;
        this.setState(state);
        this.props.getData(state);
    }

    handleInputEscolheCurso = (escolhido, ativo, key) =>{
        let state = this.state;
        if(ativo === undefined || ativo === false ){
            state.escolhidos.splice(key, 0, escolhido);
            escolhido.checked = true;
        }else{
            state.escolhidos.splice(key);
            escolhido.checked = false;
        }   
        this.setState(state);     
    }

    adicionarBolsas = () =>{
        this.props.adicionaEscolhidos(this.state.escolhidos);
        this.props.handleClose()
    }

    render() {             
        return(
            <div style={{display: this.props.modal ? 'block' : 'none'}} type="button" className="modal">
                <button onClick={() => this.closeModal()} className="close-modal"><FontAwesomeIcon icon={faTimes} size="2x"/></button>
                <section className="modal-main">                    
                    <h3>Adicionar bolsa</h3>
                    <p>Filtre e adicione as bolsas de seu interesse</p>
                    <form>
                        <form-group>
                            <label>Selecione sua cidade</label>                        
                            <select value={this.props.campos.cidadeSelecionada} onChange={this.handleInputChange} name="cidadeSelecionada">
                                {this.props.campos.cidades.map(function(value){
                                    return(
                                        <option value={value} key={value}>{value}</option>
                                    )                                         
                                })}
                            </select>
                        </form-group>
                        <form-group>
                            <label>Selecione o curso de sua preferência</label>                                         
                            <select value={this.props.campos.cursoSelecionado} onChange={this.handleInputChange} name="cursoSelecionado">
                                {this.props.campos.cursos.map(function(value){
                                    return(
                                        <option value={value} key={value}>{value}</option>
                                    )                                         
                                })}
                            </select>
                        </form-group>
                        <form-group class="checkbox">
                            <label id="label">Como você quer estudar?</label>
                            <div id="form-check">
                            <check-label>
                                <input
                                    name="presencial"
                                    type="checkbox"
                                    className="check-custom"
                                    checked={this.state.presencial}
                                    onChange={this.handleInputChange} />
                                    Presencial
                            </check-label>
                            </div>                     
                            <div id="form-check">
                                <check-label>
                                    <input
                                    name="distancia"
                                    type="checkbox"
                                    className="check-custom"
                                    checked={this.state.distancia}
                                    onChange={this.handleInputChange} />
                                    A distância
                                </check-label>
                            </div>                               
                        </form-group>                        
                        <form-group>
                            <label>
                                Até quanto pode pagar?
                                <p>R${this.state.valor}</p>  
                                <input className="range" type="range" min="1" max="10000" name="valor" value={this.state.valor} onChange={this.handleInputChange}/>
                            </label>                                                      
                        </form-group>    
                    </form>
                    <div>
                        <h4>Resultado:</h4>
                    </div>
                    {this.props.campos.entity.map((v, i) =>{                        
                        return(
                            <span  key={i}>
                                <div className="card-curso">
                                    <div className="imagem"> <img src={v.university.logo_url} alt="Faculdade-Logo" width="70%"/> </div>                        
                                    <div className="check-card">
                                        <input
                                        name="escolheCurso"
                                        type="checkbox"
                                        className="check-custom"
                                        checked={v.checked}
                                        onChange={() => this.handleInputEscolheCurso(v, v.checked, i)} />
                                    </div>
                                    
                                    <div className="curso">
                                        <h3>{v.course.name}</h3>   
                                        <p>{v.course.level}</p>
                                    </div>
                                    <div className="bolsa"> 
                                        <p>Bolsa de <green-accent>{v.discount_percentage}%</green-accent></p>
                                        <p><green-accent>R${v.price_with_discount}/mês</green-accent></p>
                                    </div>                                      
                                </div>
                                <hr></hr>
                            </span>
                        )
                    })}
                    <div className="button-group">
                        <button className="cancelar">Cancelar</button>
                        <button className={this.state.escolhidos.length === 0 ? 'disabled adicionar' : 'adicionar enabled'} onClick={() => this.adicionarBolsas()}>Adicionar bolsa(s)</button>                        
                    </div>
                </section>            
            </div>
        )
    }
}

export default Modal;
