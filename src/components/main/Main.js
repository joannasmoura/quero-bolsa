import React from 'react';
import './Main.css';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '../modal/Modal';
import axios from 'axios';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,            
            presencial: true, 
            distancia: true,
            valor: 10000, 
            cidades:[],
            cidadeSelecionada:'',
            cursos:[],
            cursosSelecionados:'',
            semestre:'',            
            entity:[],
            escolhidos:[]
        };        
    }
    componentDidMount = (event) =>{
        this.getData();        
    }

    getCourses = (data) =>{        
        let courses = []
        data.map((v) => {
            courses.push(v.course.name)
            return [...new Set(courses)]
        })
        return [...new Set(courses)]
    }

    getCities = (data) =>{        
        let cities = []
        data.map((v) => {
            cities.push(v.campus.city)
            return [...new Set(cities)]
        })
        return [...new Set(cities)]
    }

    // getCourses = (data, cities) =>{
    //     let courses = []
    //     let coursesByCity = []
    //     courses = data.filter((v) => { 
    //         if(cities.includes(v.campus.city)){
    //             return true
    //         }
    //         return false
    //     }).map((v) => {
    //         return coursesByCity.push(v.course.name)            
    //     })
        
    //     return [...new Set(coursesByCity)]
    // }

    setSemestre = (semestre) =>{
        let state = this.state;
        state.semestre = semestre;
        this.setState(state);
        this.getData();
    }

    getData = (object) =>{        
        axios.get('https://testapi.io/api/redealumni/scholarships').then( (response) => {    
            let state = this.state;    
            let data = response.data;
            if(state.semestre !== ''){
                data = response.data.filter(d => d.enrollment_semester === state.semestre); 
            }
            state.entity = data;
            state.cursos = this.getCourses(data);
            state.cidades = this.getCities(data);
            console.log(data);
            this.setState(state);
        }).catch(function (error) { 
            console.log(error);
        });
    }

    openModal = () =>{
        let state = this.state;
        state.openModal = true;
        this.setState(state);
    }

    closeModal = () =>{
        let state = this.state;
        state.openModal = false;
        this.setState(state);
    }

    funcoesModal = () =>{
        return{
            closeModal:this.closeModal(),
            getData:this.getData()
        }
    }

    camposModal = () =>{
        return{
            modalOpen: this.state.showModal,
            presencial: this.state.presencial, 
            distancia: this.state.distancia,
            valor: this.state.valor, 
            cidades:this.state.cidades,
            cidadeSelecionada:this.state.cidadeSelecionada,
            cursos:this.state.cursos,
            cursosSelecionados:this.state.cursosSelecionados,
            semestre: this.state.semestre,
            entity: this.state.entity,
            escolhidos:this.state.escolhidos
        }
    }

    adicionaEscolhidos = (escolhidos) =>{
        let state = this.state;
        state.escolhidos = escolhidos;
        this.setState(state);
    }

    removeEscolhidos = (remover) =>{                         
        let state = this.state;
        state.escolhidos.map((v, i ) => {
            if(v.full_price === remover.full_price){
                state.escolhidos.splice(i, 1)                
            }
            return true
        })
        this.setState(state);
    }
    
    render() {
        return(
            <div id="main">
                <Modal handleClose={() =>this.closeModal()} adicionaEscolhidos={(x) =>this.adicionaEscolhidos(x)} getData={(x) =>this.getData(x)} modal={this.state.openModal} campos={this.camposModal()}/>  
                <Breadcrumbs/>
                <section id="texto-principal">
                    <h1>Bolsas Favoritas</h1>
                    <p>Adicione bolsas de cursos e faculdades do seu interesse e receba atualizações com as melhores ofertas disponíveis.</p>
                </section>
                <section id="semestres" className="center">
                    <button-group>
                        <button onClick={() => this.setSemestre('')} type="button">Todos os Semestres</button>
                        <button onClick={() => this.setSemestre('2019.2')} type="button">2º Semestre de 2019</button>
                        <button onClick={() => this.setSemestre('2020.1')} type="button">1º Semestre de 2020</button>
                    </button-group>                
                </section>                
                <div id="card" className="center" onClick={this.openModal}>
                    <div id="icon">
                        <FontAwesomeIcon className="icon-color" icon={faPlus} size="3x"/>
                    </div>
                    <div id="texto">
                        <h2>Adicionar bolsa</h2>
                        <h4>Clique para adicionar bolsas de cursos de seu interesse</h4>
                    </div>                    
                </div>                                               
                {this.state.escolhidos.map((v, i) =>{
                    return(
                        <div id="card" className="center escolhido" key={i}>
                            <div>                            
                                <img src={v.university.logo_url} alt="Faculdade-Logo" width="70%"/>
                                <div className="combo-name">
                                    <label>{v.university.name}</label>
                                    <h3>{v.course.name}</h3>
                                    <p>{v.university.score}</p>
                                </div>
                                <hr></hr>
                                <div>
                                    <label>{v.course.kind} . {v.course.shift}</label>
                                    <p>Início das aulas em: {v.start_date}</p>
                                </div>
                                <hr></hr>
                                <div className="preco">
                                {v.enabled ?
                                    <span>
                                        <label>Mensalidade com o Quero Bolsa:</label>
                                        <p className="through-line">R$ {v.full_price}</p>
                                        <h3><green-accent>R$ {v.price_with_discount}</green-accent>/mês</h3>
                                    </span>                                    
                                    :
                                    <span>
                                        <label>Bolsa indisponível.</label>
                                        <p>Entre em contato com nosso atendimento para saber mais.</p>
                                    </span>                                    
                                }
                                </div>
                                <div className="acao-escolhidos">
                                    <button className="excluir" onClick={() => this.removeEscolhidos(v)}>Excluir</button>
                                    {v.enabled ?
                                        <button className="oferta enabled">Ver Oferta</button>
                                        :
                                        <button className="indisponivel disabled">Indisponível</button>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}                                    
            </div>
        )
    }
}

export default Main;
