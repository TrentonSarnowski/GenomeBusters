import React, { Component } from 'react';
import './App.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import SidePanel from '../SidePanel/SidePanel';
import Chart from '../Chart/Chart';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import configuration from '../../config';

class App extends Component {
  // constructor {{{1 //
  static config= new configuration();
  constructor(props) {
    super(props);
    this.state = {
      //canvasDomain: {x: [0, 30], y: [0, 100]},
      presets: [],
      isLoading: false
    };


    this.state.visibleBar = true;
    this.fetch_data = this.fetch_data.bind(this);
    // this.fetch_preset_data = this.fetch_preset_data.bind(this); // No preset data currently exists to fetch
    // this.fetch_presets = this.fetch_presets.bind(this);
    this.update_genbank_data = this.update_genbank_data.bind(this);

    this.state.toggleVisibleSidebar = function() {
      this.setState({
        visibleBar: !this.state.visibleBar
      })
    }.bind(this)

    // this.fetch_presets();
  }
  // 1}}} //

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.setState({ file_upload:  el});
  }

  update_genbank_data(response) {
    response.json().then(function(data_results) {
      if (this.state.gb_data_outer === undefined || this.state.gb_data_outer === null) {
        if (data_results.sequence.filename) {
          this.setState({filename_outer: data_results.sequence.filename});
        }
        this.setState({ gb_data_outer: data_results, isLoading: false });
      } 
      else {
        if (data_results.sequence.filename) {
          this.setState({filename_inner: data_results.sequence.filename});
        }
        this.setState({ gb_data_inner: data_results, isLoading: false });
      }
    }.bind(this));
  }

  fetch_data(e) {
    this.setState({isLoading: true});
    var data = new FormData();
    data.append('file', e.target.files[0]);

    this.setState({
      "filename": e.target.files[0].name,
    });

    fetch("http://"+configuration.address + '/api/gene_search', {
      method: 'POST',
      body: data
    }).then(this.update_genbank_data.bind(this));
  }

  fetch_presets() {
    fetch(configuration.address, {
      method: 'GET',
    }).then(function(response) {
      response.json().then(function(preset_results) {
        this.setState({presets: preset_results});
      }.bind(this));
    }.bind(this));
  }

  fetch_preset_data(id, name) {
    this.setState({
      "isLoading": true,
      "filename": name
    });
    fetch(configuration.address + '/preset/' + id, {
      method: 'POST'
    }).then(this.update_genbank_data.bind(this));
  }

  // render {{{1 //
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-fill"></div>
          <label className="App-file-upload-button">
            <span className="App-cell App-upload-button">Upload</span>
            <input id="file_upload" type="file" onChange={this.fetch_data} required />
          </label>
          <DropdownMenu fetch_preset_function={this.fetch_preset_data} presets={this.state.presets} />
        </div>
        <div className="leftPanel" style={this.state.visibleBar ? {display:'block'} : {display: 'none'}}>
          <SidePanel isLoading={ this.state.isLoading } filename={ this.state.filename_outer } gb_data={ this.state.gb_data_outer } toggleSwitch={this.state.toggleVisibleSidebar}/>
        </div>
        <div className="rightPanel" style={!this.state.visibleBar ? {display:'block'} : {display: 'none'}}>
          <SidePanel isLoading={ this.state.isLoading } filename={ this.state.filename_inner } gb_data={ this.state.gb_data_inner } toggleSwitch={this.state.toggleVisibleSidebar}/>
        </div>
        <div className="left">
          <Chart data={this.state.gb_data_outer}/>
        </div>
        <div className="right">
          <Chart data={this.state.gb_data_inner}/>
        </div>
      </div>
    );
  }
  // 1}}} //
}

export default App;
