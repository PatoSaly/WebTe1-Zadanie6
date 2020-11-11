document.addEventListener("DOMContentLoaded", () => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'SIN',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            }, {
                label: 'COS',
                backgroundColor: 'rgb(3, 207, 252)',
                borderColor: 'rgb(3, 207, 252)',
                data: [],
                fill: false,
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            plugins: {
                zoom: {
                    // Container for pan options
 
                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,
 
                        // Enable drag-to-zoom behavior
                        drag: true,
 
                        // Drag-to-zoom effect can be customized
                        // drag: {
                        // 	 borderColor: 'rgba(225,225,225,0.3)'
                        // 	 borderWidth: 5,
                        // 	 backgroundColor: 'rgb(225,225,225)',
                        // 	 animationDuration: 0
                        // },
 
                        // Zooming directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow zooming in the y direction
                        // A function that is called as the user is zooming and returns the
                        // available directions can also be used:
                        //   mode: function({ chart }) {
                        //     return 'xy';
                        //   },
                        mode: 'xy',
 
                        rangeMin: {
                            // Format of min zoom range depends on scale type
                            x: null,
                            y: null
                        },
                        rangeMax: {
                            // Format of max zoom range depends on scale type
                            x: null,
                            y: null
                        },
 
                        // Speed of zoom via mouse wheel
                        // (percentage of zoom on a wheel event)
                        speed: 0.1,
 
                        // Minimal zoom distance required before actually applying zoom
                        threshold: 2,
 
                        // On category scale, minimal zoom level before actually applying zoom
                        sensitivity: 3,
 
                      /*  // Function called while the user is zooming
                        onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                        // Function called once zooming is completed
                        onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }*/
                    }
                }
            }
        }
    });

    if(typeof(EventSource) !== "undefined") {
        var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
        document.querySelector("#endButton").onclick = function() {
            source.close();
        }

        source.addEventListener("message", function(e) {
            var value = document.getElementById("myForm").shadowRoot.querySelector('#rangeInput').value;
            var data = JSON.parse(e.data);
            chart.data.labels.push(data.x); 
            if($('#sin').is(":checked")) {
                chart.data.datasets[0].data.push({x:(data.x), y:(data.y1*value)});
                chart.getDatasetMeta(0).hidden=false;
            } else {
                chart.getDatasetMeta(0).hidden=true;
            }
            if($('#cos').is(":checked")) {
                chart.getDatasetMeta(1).hidden=false;
                chart.data.datasets[1].data.push({x:(data.x), y:(data.y2*value)});
            } else {
                chart.getDatasetMeta(1).hidden=true;
            }
            chart.update(); 
            
            
        }, false);
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }
});

