import React, { Component } from 'react';
import './App.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import SidePanel from '../SidePanel/SidePanel';
import Chart from '../Chart/Chart';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';

class App extends Component {
  // constructor {{{1 //
  constructor(props) {
    super(props);
    this.state = {
      //canvasDomain: {x: [0, 30], y: [0, 100]},
      presets: [],
      isLoading: false
    };

    this.fetch_data = this.fetch_data.bind(this);
    this.fetch_preset_data = this.fetch_preset_data.bind(this);
    this.fetch_presets = this.fetch_presets.bind(this);
    this.update_genbank_data = this.update_genbank_data.bind(this);

    this.fetch_presets();
  }
  // 1}}} //

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.setState({ file_upload:  el});
  }

  update_genbank_data(response) {
    response.json().then(function(data_results) {
      if (data_results.sequence.filename) {
        this.setState({filename: data_results.sequence.filename});
      }
      this.setState({ gb_data: data_results, isLoading: false });
    }.bind(this));
  }

  fetch_data(e) {
    this.setState({isLoading: true});
    var data = new FormData();
    data.append('file', e.target.files[0]);

    this.setState({
      "filename": e.target.files[0].name,
    });

    fetch('http://localhost:8080', {
      method: 'POST',
      body: data
    }).then(this.update_genbank_data.bind(this));
  }

  fetch_presets() {
    fetch('http://localhost:8080', {
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
    fetch('http://localhost:8080/preset/' + id, {
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

        <SidePanel isLoading={ this.state.isLoading } filename={ this.state.filename } gb_data={ this.state.gb_data } />
        <Chart data={this.state.gb_data} />
      </div>
    );
  }
  // 1}}} //
}

export default App;
