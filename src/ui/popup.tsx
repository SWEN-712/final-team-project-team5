import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.css"

class Hello extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            smoothingEnabled : false,
            smoothingAmount : 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    }

    log(message){
       chrome.runtime.sendMessage(message)
    }

    handleCheckboxChange(event){
        this.setState({[event.target.name] :  !this.state['smoothingEnabled']});
    }

    handleChange(event){
        this.setState({[event.target.name] : (event.target.value)});
    }



    render() {
        return (
            <div className="popup-padded">
                <form>
                    <label><h3>Mouse Smoothing</h3></label>
                    <label>Enable:</label>
                    <input type="checkbox" name="smoothingEnabled" checked={this.state["smoothingEnabled"]} onChange={this.handleCheckboxChange}/>
                    <br/>
                    <label> Smoothing Amount: {this.state["smoothingAmount"]}</label>
                    <input type="range" id="smoothingAmount" name="smoothingAmount" step="1" min = "0" max="100%" value={this.state["smoothingAmount"]} onChange={this.handleChange} readOnly={!this.state['smoothingEnabled']}/>
                </form>
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)