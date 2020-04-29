import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.css"

class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      smoothingEnabled: false,
      smoothingAmount: 0,
      buttonEnlargementEnabled: false,
      buttonEnlargementAmount: 0,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSmoothingChange = this.handleSmoothingChange.bind(this)

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleEnlargementChange  = this.handleEnlargementChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state['smoothingEnabled'] !== prevState['smoothingEnabled']) {
        chrome.tabs.query({active:true, currentWindow:true}, function(tab){
          chrome.tabs.sendMessage(tab[0].id, {from:"ui", subject:"mouseSmoothing", content:"toggle"})
        });
    }

      if(this.state['buttonEnlargementEnabled'] !== prevState['buttonEnlargementEnabled']) {
          chrome.tabs.query({active:true, currentWindow:true}, function(tab){
              chrome.tabs.sendMessage(tab[0].id, {from:"ui", subject:"buttonEnlargementToggle", content:"toggle"})
          });
      }


  }

  handleSmoothingChange(event){
    chrome.tabs.query({active:true, currentWindow:true}, function(tab){

        chrome.tabs.sendMessage(tab[0].id, {from:"ui", subject:"smoothingAmount", content:event.target.value })
      });
      this.handleChange(event);

  }


    handleEnlargementChange(event){
        this.handleChange(event);
        chrome.tabs.query({active:true, currentWindow:true}, function(tab){
            chrome.tabs.sendMessage(tab[0].id, {from:"ui", subject:"buttonEnlargementAmount", content:event.target.value })
        });

    }


  handleCheckboxChange(event) {
    console.log("handleCheckboxChange");
    this.setState({ [event.target.name]: !this.state[event.target.name] })

  }

  handleChange(event) {
    console.log("handleChange")
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="popup-padded">
        <form>
          <label>
            <h3>Mouse Smoothing</h3>
          </label>
          <label>Enable:</label>
          <input
            type="checkbox"
            name="smoothingEnabled"
            // checked={this.state.smoothingEnabled}
            onChange={this.handleCheckboxChange}
          />
          <br />
          <label> Smoothing Amount: {this.state["smoothingAmount"]}</label>
          <input
            type="range"
            id="smoothingAmount"
            name="smoothingAmount"
            step="1"
            min="0"
            max="100%"
            value={this.state["smoothingAmount"]}
            onChange={this.handleSmoothingChange}
          />
          <label>
            <h3>Button Enlargement</h3>
          </label>
          <label>Enable:</label>
          <input
            type="checkbox"
            name="buttonEnlargementEnabled"
            onChange={this.handleCheckboxChange}
          />
          <br />
          <label>
            {" "}
            Button Enlargement Amount: {this.state["buttonEnlargementAmount"]}
          </label>
          <input
            type="range"
            id="buttonEnlargementAmount"
            name="buttonEnlargementAmount"
            step="1"
            min="0"
            max="100%"
            value={this.state["buttonEnlargementAmount"]}
            onChange={this.handleEnlargementChange}
          />
        </form>
      </div>
    )
  }
}

// --------------

ReactDOM.render(<Hello />, document.getElementById("root"))
