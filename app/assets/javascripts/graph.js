
graphFunctions = {
  init: function () {
    $.ajax({
      url: window.location.pathname + '.json',
      type: 'GET',
      success: function (data) {
        graphFunctions.createGraph(data);
      }
    })
  },

  createGraph: function (lineData) {
    var vis = d3.select('#graph'),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        },
        xRange = d3.scaleTime()
          .range([MARGINS.left, WIDTH - MARGINS.right])
          .domain([
            new Date( Date.parse(lineData[0].date) ),
            new Date( Date.parse(lineData[lineData.length - 1].date) )
          ]),
        yRange = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
          return d.lowest_price;
        }), d3.max(lineData, function(d) {
          return d.lowest_price;
        })]),
        xAxis = d3.axisBottom(xRange)
          .ticks( Math.round((lineData.length - 1)) )
          .tickFormat(d3.timeFormat("%b-%d"));
        yAxis = d3.axisLeft()
          .scale(yRange)
          .tickSize(5);

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);

      // data points
      var lineGen = d3.line()
        .x(function(d) {
          return xRange(new Date (Date.parse(d.date) ) );
        })
        .y(function(d) {
          return yRange(d.lowest_price);
        });

      vis.append('svg:path')
        .attr('d', lineGen(lineData))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

  }


}


$(document).ready(function() {
  graphFunctions.init();
})
