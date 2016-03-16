/* 575 boilerplate main.js */
//
//load the window
window.onload = function(){
    var w = 950;
    var h = 500;

var container = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "container") ;

var rectangle = container.append("rect")
    .datum(400)
    .attr("width", function(d) {
      //console.log(d);
      return d * 2;
    })
    .attr("height", function(d) {
       return d ;
    })
    .attr("class", "rectangle")

    .attr("x", 75) //x is the position from left
    .attr("y", 50) //y is the position from top
    .style("fill", "#ffffff")
    //console.log(container)

// populations estimates from 2014
var citiesArray = [
    {
      city: 'Sun Prairie',
      population: 31752  //
    },
    {
      city: 'La Crosee',
      population: 52440
    },
    {
      city: 'Antigo',
      population: 7921
    },
    {
      city: 'Middleton',
      population: 18671
    }
];

var minPop = d3.min(citiesArray, function(d){
    return d.population;
});

//find the maximum value of the array
var maxPop = d3.max(citiesArray, function(d){
    return d.population;
});

//scale for circles center y coordinate
var y = d3.scale.linear()
    .range([450, 50])
    .domain([
        0, //minPop,
        60000 //maxPop
    ]);

var x = d3.scale.linear() //create the scale
    .range([120, 800]) //output min and max
    .domain([0, 3]); //input min and max

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var title = container.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", 450)
    .attr("y", 35)
    .text("City Populations");

var labels = container.selectAll(".labels")
    .data(citiesArray)
    .enter()
    .append("text")
    .attr("class", "labels")
    .attr("text-anchor", "left")
    .attr("y", function(d){
                //vertical position centered on each circle
        return y(d.population) - 5;
    });

var nameLine = labels.append("tspan")
    .attr("class", "nameLine")
    .attr("x", function(d,i){
        //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .text(function(d){
        return d.city;
    });

var format = d3.format(",");

var popLine = labels.append("tspan")
    .attr("class", "popLine")
    .attr("x", function(d,i){
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .attr("dy", "15") //vertical offset
    .text(function(d){
        return "Pop. " + format(d.population);
});

var popLine = labels.append("tspan")
    .attr("class", "popLine")
    .attr("x", function(d,i){
                //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .text(function(d){
        return "Pop. " + format(d.population);
    });

        //create axis g element and add axis
var axis = container.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(75, 0)")
    .call(yAxis);

var color = d3.scale.linear()
        .range([
            "#9ecae1",
            "#2171b5"
        ])
        .domain([
            minPop,
            maxPop
        ]);

var circles = container.selectAll(".circles")
      .data(citiesArray)
      .enter()
      .append("circle")
      .attr("class", "circles")
      .attr("id", function(d){
          return d.city;
      })
      .attr("r", function(d){
          //calculate the radius
          var area = d.population * 0.01;
          return Math.sqrt(area/Math.PI);
      })

      .attr("cx", function(d, i){
          //use the index to place each circle horizontally
          return x(i);  //90 + (i * 180);
      })
      .attr("cy", function(d){
          //subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
          return y(d.population);
      })
      .style("fill", function(d, i){ //add a fill based on the color scale generator
        return color(d.population);
        })
      .style("stroke", "#000");


};
