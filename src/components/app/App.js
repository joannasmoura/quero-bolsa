import React from 'react';
import './App.css';
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import Main from '../main/Main.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
        };
    }
    
    render(){
        return (
            <div>
                <Header />        
                <Main/>        
                <Footer />                
            </div>
        );
    }
    
}

export default App;
