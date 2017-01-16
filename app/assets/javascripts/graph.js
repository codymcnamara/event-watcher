
graphFunctions = {
  allData: {},
  currentData: [],


  init: function () {
    $.ajax({
      url: window.location.pathname + '.json',
      type: 'GET',
      success: function (data) {
        graphFunctions.createGraph(data);
        graphFunctions.allData = data;
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
        .y(function(d, price_type) {
          return yRange(d.lowest_price);
        });

      vis.append('svg:path')
        .attr('d', lineGen(lineData, 'low'))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
  },

  changeData: function (event) {
    // remove curent lines
    // look at which checkboxes are selected
    // paint each line for each price type selected


    graphFunctions.currentData = [];

    $('.graph_options input').each(function (index, input) {
      if(input.checked){
        graphFunctions.currentData.push(input.value);
      }
    })

    // if(event.target.checked){
    //   var priceType = event.target.value;

    // var vis = d3.select('#graph')
    var WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };
    // get new domain
    var yRange = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(graphFunctions.allData, function(d) {
      // min of
      minVals = [];
      graphFunctions.currentData.forEach(function (priceType) {
        minVals.push(d[priceType]);
      })

      var min = Math.min(...minVals);

      return min;
    }), d3.max(graphFunctions.allData, function(d) {
      maxVals = [];
      graphFunctions.currentData.forEach(function (priceType) {
        maxVals.push(d[priceType]);
      })

      var max = Math.max(...maxVals);

      return max;
    })]);

    vis = d3.select('#graph');

    var yAxis = d3.axisLeft()
      .scale(yRange)
      .tickSize(5);

    vis.selectAll(".y.axis").remove();

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);


  }

}


$(document).ready(function() {
  graphFunctions.init();

  $(document).on('click', '.graph_options input', function (e) {
    graphFunctions.changeData(e);
  })

})
