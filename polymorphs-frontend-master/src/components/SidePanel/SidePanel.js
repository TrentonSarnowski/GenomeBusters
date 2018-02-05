import React, { Component } from 'react';
import './SidePanel.css';

class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	menuActive: true,
    	hoverActive: false,
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
    this.gethovBoxPrompt = this.getHovBoxPrompt.bind(this);
    this.state.clicked = function(event) {props.toggleSwitch()}.bind(this)
    /*this.select = this.select.bind(this);*/
  }

  toggleMenu() {
    this.setState({menuActive: !this.state.menuActive});
  }
  activateHover() {
    this.setState({hoverActive: true});
  }
  deactivateHover(){
    this.setState({hoverActive: false});
  }
  getHovBoxPrompt(){
    if(this.state.menuActive){
      return <span>Collapse Side Panel</span>
    } else{
      return <span>Expand Side Panel</span>
    }
  }

  //  <a href="#" onClick={this.state.clicked}>View Other Genome gene list</a>
  render() {
    return (
      <div className="SidePanel">
      	<div className={`SidePanel-mainBox ${this.state.menuActive ? 'show' : 'hidden'}`}>
          <div className="SidePanel-mainBox SidePanel-cell">
            <label className="App-file-upload-button">
              <span className="App-cell App-upload-button">Switch Genome</span>
              <button onClick={this.state.clicked}/>
            </label>
            <div className="SidePanel-top">
              { this.props.filename? <h4>Viewing Genome: {this.props.filename}</h4> : <h4>Upload a file to start</h4> }
              { !this.props.gb_data && this.props.filename || this.props.isLoading ? <div>Loading...</div> : <div></div> }
              { this.props.gb_data && !this.props.isLoading? <div>Features found: {this.props.gb_data.sequence.features_found}</div> : <div></div> }
              { this.props.gb_data && !this.props.isLoading? <div>Sequence Length: {this.props.gb_data.sequence.sequence_length}</div> : <div></div> }
            </div>
            <div className="SidePanel-mainBox-scroll">
              <ul>
                {this.props.gb_data && this.props.gb_data.sequence ?
                  this.props.gb_data.sequence.features.map(function(gene) {
                    return gene.label ? <li key={gene.id}>{gene.label}</li> : "";
                  }, this)
                : ""}
              </ul>
            </div>
          </div>  
      	</div>
      	<div className={`SidePanel-collapseBox ${this.state.menuActive ? 'open' : 'closed'}`}>
     		<div className="SidePanel-collapseBox SidePanel-cell" onClick={this.toggleMenu} onMouseOver={this.activateHover} onMouseLeave={this.deactivateHover}>+</div>
     	</div>
     	<div className={`SidePanel-hovBox ${this.state.hoverActive ? 'yeshover' : 'nohover'} ${this.state.menuActive ? 'open' : 'closed'}`}>
     		{this.getHovBoxPrompt()}
     	</div>
    </div>
    );
  }

}

export default SidePanel;
