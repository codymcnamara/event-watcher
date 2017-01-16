
graphFunctions = {
  allData: {},
  WIDTH: 1000,
  HEIGHT: 500,
  MARGINS: {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },

  init: function () {
    $.ajax({
      url: window.location.pathname + '.json',
      type: 'GET',
      success: function (data) {
        graphFunctions.allData = data;
        graphFunctions.createGraph();
      }
    })
  },

  createGraph: function () {
    var vis = d3.select('#graph');

    graphFunctions.xRange = d3.scaleTime()
      .range([graphFunctions.MARGINS.left, graphFunctions.WIDTH - graphFunctions.MARGINS.right])
      .domain([
        new Date( Date.parse(graphFunctions.allData[0].date) ),
        new Date( Date.parse(graphFunctions.allData[graphFunctions.allData.length - 1].date) )
      ])

    var xAxis = d3.axisBottom(graphFunctions.xRange)
      .ticks( Math.round((graphFunctions.allData.length - 1)) )
      .tickFormat(d3.timeFormat("%b-%d"));

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (graphFunctions.HEIGHT - graphFunctions.MARGINS.bottom) + ')')
      .call(xAxis);

      var yRange = graphFunctions.getYrange();
      graphFunctions.drawYaxis(yRange);

      // data points
      var lineGen = d3.line()
        .x(function(d) {
          return graphFunctions.xRange(new Date (Date.parse(d.date) ) );
        })
        .y(function(d) {
          return yRange(d.lowest_price);
        });

      vis.append('svg:path')
        .attr('class', 'line')
        .attr('d', lineGen(graphFunctions.allData))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

  },

  getYrange: function() {
    var priceTypes = [];

    $('.graph_options input').each(function (index, input) {
      if(input.checked){
        priceTypes.push(input.value);
      }
    })

    var yRange = d3.scaleLinear().range([graphFunctions.HEIGHT - graphFunctions.MARGINS.top, graphFunctions.MARGINS.bottom]).domain([d3.min(graphFunctions.allData, function(d) {
      minVals = [];
      priceTypes.forEach(function (priceOption) {
        minVals.push(d[priceOption]);
      })

      var min = Math.min(...minVals);

      return min;
    }), d3.max(graphFunctions.allData, function(d) {
      maxVals = [];
      priceTypes.forEach(function (priceOption) {
        maxVals.push(d[priceOption]);
      })

      var max = Math.max(...maxVals);

      return max;
    })]);

    return yRange;
  },

  drawYaxis: function (yRange) {
    // remove curent lines
    // look at which checkboxes are selected
    // paint each line for each price type selected

    vis = d3.select('#graph');

    var yAxis = d3.axisLeft()
      .scale(yRange)
      .tickSize(5);

    vis.selectAll(".y.axis").remove();

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (graphFunctions.MARGINS.left) + ',0)')
      .call(yAxis);
  },

  createYaxis: function () {
    var yRange = graphFunctions.getYrange();
    graphFunctions.drawYaxis(yRange);
  },

  createLines: function () {
    var lineColor;
    var priceTypes = [];

    vis.selectAll(".line").remove();

    $('.graph_options input').each(function (index, input) {
      if(input.checked){
        priceTypes.push(input.value);
      }
    })

    var yRange = graphFunctions.getYrange();

    priceTypes.forEach(function (priceOption) {
      var lineGen = d3.line()
        .x(function(d) {
          return graphFunctions.xRange(new Date (Date.parse(d.date) ) );
        })
        .y(function(d) {
          return yRange(d[priceOption]);
        });

        if(priceOption == 'lowest_price'){
          lineColor = 'green';
        } else if (priceOption == 'highest_price') {
          lineColor = 'blue';
        } else {
          lineColor = 'red';
        }

      vis.append('svg:path')
        .attr('class', 'line')
        .attr('d', lineGen(graphFunctions.allData))
        .attr('stroke', lineColor)
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    })

  }

}


$(document).ready(function() {
  graphFunctions.init();

  $(document).on('click', '.graph_options input', function () {
    graphFunctions.createYaxis();
    graphFunctions.createLines();
  });

})
