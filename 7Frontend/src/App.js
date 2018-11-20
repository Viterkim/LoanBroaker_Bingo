import React, { Component } from 'react';
import './styles.css';
import { handleRequest, openWebsocket } from './api';

class App extends Component {

    state = {
        first6: '',
        last4: '',
        duration: '',
        amount: '',
        timeout: false,
        tableData: []
    }

    componentDidMount() {
        this.first6.focus();
    }

    handleFirstInput = (e) => {
        if (e.target.value.match(/^[0-9]+$/)) {
            if (e.target.value.length < 7) {
                this.setState({first6: `${e.target.value}`})
                console.log(e.target.value);
            } else if (e.target.value.length === 7) {
                this.last4.focus();
                const additional = e.target.value;
                this.setState({last4: `${this.state.last4}${additional.substring(6)}`})
            }
        }
    }

    handleSecondInput = (e) => {
        if (e.target.value.match(/^[0-9]+$/)) {
            if (e.target.value.length < 5) {
                this.setState({last4: `${e.target.value}`})
            } else if (e.target.value.length === 5) {
                this.duration.focus();
                const additional = e.target.value;
                this.setState({duration: `${this.state.duration}${additional.substring(4)}`})
            }
        }
    }

    handleDuration = (e) => {
        if (e.target.value.match(/^[0-9]+$/)) {
            if (e.target.value.length < 4) {
                this.setState({duration: `${e.target.value}`})
            } else if (e.target.value.length === 4) {
                this.amount.focus();
                const additional = e.target.value;
                this.setState({amount: `${this.state.amount}${additional.substring(3)}`})
            }
        }
    }

    handleAmount = (e) => {
        if (e.target.value.match(/^[0-9]+$/)) {
            if (e.target.value.length < 6) {
                this.setState({amount: `${e.target.value}`})
            }
        }
    }

    resetSSN = () => {
        this.setState({
            first6: '',
            last4: ''
        });
        this.first6.focus();
    }

    handleKeyPressFirst = (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 1) {
            e.preventDefault();
            this.setState({first6: ''});
        }
    }

    handleKeyPressLast = (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 1) {
            e.preventDefault();
            this.setState({last4: ''});
            this.first6.focus();
        } 
    }

    handleKeyPressDuration = (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 1) {
            e.preventDefault();
            this.setState({duration: ''});
        }
    }

    handleKeyPressAmount = (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 1) {
            e.preventDefault();
            this.setState({amount: ''});
        }
    }

    render() {

        const tableRows = this.state.tableData.map((element, index) => {
            return (
                <tr key={index} className="container">
                    <td>{element.bank}</td>
                    <td>{element.interest}</td>
                </tr>
            )
        })

        return (
            <div className="App">
                <div className="container">
                    <span>Social Security Number: </span>
                    <input className="first6" type="text" 
                        ref={(input) => {this.first6 = input}}
                        onChange={this.handleFirstInput} value={this.state.first6}
                        onKeyDown={this.handleKeyPressFirst}
                    />
                    -
                    <input className="last4" type="text" 
                        ref={(input) => {this.last4 = input}}
                        onChange={this.handleSecondInput} value={this.state.last4}
                        onKeyDown={this.handleKeyPressLast}
                    />
                    <button className="ResetButton" onClick={this.resetSSN}>Reset</button>                    
                </div>
                <div className="container">
                    <span>Loan Duration: </span>
                    <input className="duration" type="text" 
                        ref={(input) => {this.duration = input}}
                        onChange={this.handleDuration} value={this.state.duration}
                        onKeyDown={this.handleKeyPressDuration}
                    />
                    <span> months</span>
                </div>
                <div className="container">
                    <span>Loan Amount: </span>
                    <input className="amount" type="text" 
                        ref={(input) => {this.amount = input}}
                        onChange={this.handleAmount} value={this.state.amount}
                        onKeyDown={this.handleKeyPressAmount}
                    />
                    <span> USD</span>
                </div>
                <div className="container">
                    <button disabled={!this.state.first6 || !this.state.last4 || !this.state.duration || !this.state.amount || this.state.timeout}
                        onClick={() => {
                            handleRequest(`${this.state.first6}-${this.state.last4}`, this.state.duration, this.state.amount, (bankQuote) => {
                                const array = this.state.tableData;
                                array.push(JSON.parse(bankQuote));
                                this.setState({
                                    tableData: array
                                })
                            })
                        }}
                    >Request Quotes</button>
                </div>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Bank</th>
                                <th>Interest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
