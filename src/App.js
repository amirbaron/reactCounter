import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {LikeCounter} from './like_counter';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {span: false, counter:0};
    }

    toggleSpan = () => {
        this.setState({span: !this.state.span});
    }

    incInitialCounter = () => {
        this.setState({counter:this.state.counter + 1});
    }

    renderApp = () => {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to the React workshop</h1>
                </header>
                <div className="container">
                    <button onClick={this.toggleSpan}>Do something</button>
                    <button onClick={this.incInitialCounter}>Inc initial counter</button>
                    <LikeCounter counter={this.state.counter}/>
                </div>
            </div>);
    }

    render() {
        if (this.state.span) {
            return (
                <div className="App">
                    {this.renderApp()}
                </div>);
        } else {
            return (<span className="App">
                {this.renderApp()}
            </span>);
        }
    }
}

export default App;
