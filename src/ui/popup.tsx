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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange(event) {
    console.log("handleCheckboxChange")
    this.setState({ [event.target.name]: !this.state[event.target.name] })
  }

  handleChange(event) {
    console.log("handleChange")
    this.setState({ [event.target.name]: event.target.value })
    var y = document.querySelectorAll("button")
    console.log(y)
    for (let element of y) {
      let percent = event.target.value + "%"
      element.style.fontSize = "4000%"
    }
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
            onChange={this.handleChange}
            readOnly={!this.state["smoothingEnabled"]}
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
            onChange={this.handleChange}
            readOnly={!this.state["buttonEnlargementAmount"]}
          />
        </form>
      </div>
    )
  }
}

// --------------

ReactDOM.render(<Hello />, document.getElementById("root"))
