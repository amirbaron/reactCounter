import React, {Component} from 'react';
import $ from "jquery";

export class LikeCounter extends Component {

    constructor(props) {
        // always call super(props)
        //good place to initialize state
        // “fork” props to state
        super(props);
        console.log("constructor");
        this.state = {counter: this.props.counter, priceUsd: 0};
        this.mounted = false

    }

    componentWillMount() {
        //immediately before mounting occurs
        // Avoid introducing any side-effects or subscriptions in this method.
        // For those use cases, use componentDidMount() instead
        console.log("componentWillMount");
    }

    getBitCoinPrice = () => {
        if (this.mounted) {
            $.get('https://poloniex.com/public?command=returnTicker').done((res) => {
                console.log(res);
                let bitCoinPrice = res.USDT_BTC.last;
                this.setState({priceUsd: bitCoinPrice})
            })
            window.setTimeout(this.getBitCoinPrice, 5000);
        }
    }

    componentDidMount() {
        // is invoked immediately after a component is mounted.
        // Initialization that requires DOM nodes should go here.
        // If you need to load data from a remote endpoint,
        // this is a good place to instantiate the network request
        this.mounted = true;
        this.getBitCoinPrice();
        console.log("componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        // is invoked before a mounted component receives new props.
        // If you need to update the state in response to prop changes (for example, to reset it),
        // you may compare this.props and nextProps and perform state transitions using this.setState() in this method
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        //shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. This method is
        // not called for the initial render or when forceUpdate() is used.
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        //is invoked immediately before rendering when new props or state are being received.
        // Use this as an opportunity to perform preparation before an update occurs.
        // This method is not called for the initial render
        console.log('componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        // Use this as an opportunity to operate on the DOM when the component has been
        // updated. This is also a good place to do network requests as long
        // as you compare the current props to previous props
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        //is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method,
        // such as invalidating timers, canceling network requests,
        console.log('componentWillUnmount');
        this.mounted = false;
    }

    onLike = () => {
        this.setState({counter: this.state.counter + 1});
    }

    render() {
        console.log("Render")
        return (<span>
            <span className="price"> Bitcoin price {this.state.priceUsd}</span>
            <span>Liked {this.state.counter} times</span>
            <span>
            <button onClick={this.onLike}>
                Like!
            </button>
            </span>
        </span>);
    }

}