import React, { Component } from 'react';
import d3Chart from '../d3Chart/d3Chart';
import ReactDOM from 'react-dom';
import './Chart.css';

class Chart extends Component {
	propTypes: {
		data: React.PropTypes.array,
		domain: React.PropTypes.object
	}

	componentDidMount() {
		const el = ReactDOM.findDOMNode(this);
		d3Chart.create(el, {
			width: '100%',
			height: '300px',
		}, this.getChartState());
	}

	componentDidUpdate() {
		const el = ReactDOM.findDOMNode(this);
		console.log(d3Chart);
		d3Chart.update(el, this.getChartState());
	}

	getChartState() {
		return {
			data: this.props.data,
      outer_radius: 1000,
      inner_radius: 950
		};
	}

	componentWillUnmount() {
		const el = ReactDOM.findDOMNode(this);
		d3Chart.destroy(el);
	}

	render() {
		return (
			<div className="Chart"></div>
		);
	}	
}

export default Chart;

