import * as d3 from "d3";
import _ from "underscore";

class d3Chart {
  static create(el, props, state) {
    // todo - get the gene information out of the props
    // todo - randomize colors
    // todo - create with genes + colors + sequence id

    //let values = [10, 70, 20];
    this.update(el, state);
  }

  static updateCirclesOnZoom(target, type, transform, sourceEvent) {
    if (!d3 || !d3.event || !d3.event.transform) {
      return;
    }

    //////////////////
    //components
    //  features - Array
    //  features_found - number
    //  sequence_length - number
    /////////////////

    let className="standard";
    if (d3.event && d3.event.transform.k > 5) {
      className="detailed";

      if (svg.selectAll(".standard")._groups[0].length > 0) {
        svg.selectAll(".standard").remove();
      }
    } else if (svg.selectAll(".detailed")._groups[0].length > 0) {
      svg.selectAll(".detailed").remove();
    }

    let color = d3.scaleOrdinal().range(["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC"]);

    let pie = d3.pie().sort(null).value(function(feature) {
      return feature.end - feature.start;
    });

    let widthCenter = el.clientWidth / 2 + 850*3.3;
    let heightCenter = el.clientHeight / 2 + 850;
    let scaleFactor = 3.3;


    let arc = d3.arc()
      .innerRadius(state.inner_radius)
      .outerRadius(state.outer_radius);

    let labelArc = d3.arc()
      .innerRadius(state.inner_radius)
      .outerRadius(state.outer_radius);

    let g = svg.selectAll(".arc")
      .data(pie(this.data.sequence.features))
      .enter().append("g")
      .attr("class", "arc " + className);

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        return color(d.index % 13);
      });

    if (d3.event && d3.event.transform.k > 5) {
      let gText = svg.selectAll(".arcText")
        .data(this.data.sequence.features)
        .enter().append("text")
        .attr("class", "arcText")
        .append("textPath")
        .attr("xlink:href", function(d, i) {return "#arcLabel_"+i})
        .text(function(d) {return d.label});
    }

    g.attr("transform", "translate(" + widthCenter + ", " + heightCenter + ")scale(" + scaleFactor + ","  + scaleFactor + ")");

    svg.attr("transform", d3.event.transform)

  }

  // Re-compute the scales, and render the data points
  static update(el, state) {
    if (!state || !state.data || !state.data.sequence) {
      return;
    }
    let svg = d3.select(el)
      .append('svg')
      .attr('width', "100%")
      .attr('height', "100%");
    svg.call(d3.zoom().on("zoom", function(target, type, transform, sourceEvent) { 
      updateCirclesOnZoom.bind(state, target, type, transform, sourceEvent)()
    })).append('g');


    const initial_features = [{start: 0, end: 5000, label: "Zoom in to see more"}];

    //components
    //  features - Array
    //  features_found - number
    //  sequence_length - number
    let color = d3.scaleOrdinal().range(["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC"]);

    let pie = d3.pie().sort(null).value(function(d) {
      return initial_features.end - initial_features.start;
    });

    let widthCenter = el.clientWidth / 2 + 850*3.3;
    let heightCenter = el.clientHeight / 2 + 850;
    let scaleFactor = 3.3;


    let arc = d3.arc()
      .innerRadius(state.inner_radius)
      .outerRadius(state.outer_radius);

    let labelArc = d3.arc()
      .innerRadius(state.inner_radius)
      .outerRadius(state.outer_radius);

    let g = svg.selectAll(".arc")
      .data(pie(initial_features))
      .enter().append("g")
      .attr("class", "arc standard");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data % 13); });

    let gText = svg.selectAll(".arcText")
      .data(initial_features)
      .enter().append("text")
      .style("color", "white")
      .style("stroke", "white")
      .append("textPath")
      .text(function(d) {return d.label});

    g.attr("transform", "translate(" + widthCenter + ", " + heightCenter + ")scale(" + scaleFactor + ","  + scaleFactor + ")");

    //let scales = this._scales(el, state.domain);
    //this._drawPoints(el, scales, state.data);
  }

  // clean-up goes here
  static destroy(el) {

  }

  static _drawComponent(el, component) {

  }

  static _drawPoints(el, scales, data) {
    /*var g = d3.select(el).selectAll('.d3-points');

     var point = g.selectAll('.d3-point').data(data, function(d) { return d.id; });

// ENTER
     point.enter().append('circle').attr('class', 'd3-point');

// ENTER & UPDATE
     point.attr('cx', function(d) { return scales.x(d.x); })
     .attr('cy', function(d) { return scales.y(d.y); })
     .attr('r', function(d) { return scales.z(d.z); });

// EXIT
     point.exit().remove();*/
}

static _scales(el, domain) {
  if (!domain) {
    return null;
  }

  let width = el.offsetWidth;
  let height = el.offsetHeight;

  let x = d3.scaleLinear().range([0, width]).domain(domain.x);
  let y = d3.scaleLinear().range([height, 0]).domain(domain.y);
  let z = d3.scaleLinear().range([5, 20]).domain([1, 10]);

  return {x: x, y: y, z: z};
};
}

export default d3Chart;
