import React, { Component } from 'react';
import './DropdownMenu.css';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);


    this.state = {
      active: false,
    };

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  toggle() {
    this.setState({active: !this.state.active});
  }

  select(id) {
    this.props.fetch_preset_function(id);
    this.setState({active: false});
  }

  render() {
    return (
      <div className="App-cell App-select">
        <div className="DropdownMenu-label" onClick={this.toggle}>Select</div>
        <div className={`DropdownMenu-select-menu ${this.state.active ? 'show' : 'hidden'}`}>
          <img role="presentation" src="/triangle.svg" />
          <ul>
            {this.props.presets.map(function(genome) {
              return <li onClick={() => this.select(genome.id)} key={genome.id}>{genome.name}</li>
            }, this)}
          </ul> 
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
