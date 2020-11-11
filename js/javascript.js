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
            }
        }
    });

    if(typeof(EventSource) !== "undefined") {
        var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
        document.querySelector("#endButton").onclick = function() {
            source.close();
        }

        source.addEventListener("message", function(e) {
            var data = JSON.parse(e.data);
            chart.data.labels.push(data.x); 
            if($('#sin').is(":checked")) {
                chart.data.datasets[0].data.push({x:data.x, y:data.y1});
                chart.getDatasetMeta(0).hidden=false;
            } else {
                chart.getDatasetMeta(0).hidden=true;
            }
            if($('#cos').is(":checked")) {
                chart.getDatasetMeta(1).hidden=false;
                chart.data.datasets[1].data.push({x:(data.x), y:(data.y2)});
            } else {
                chart.getDatasetMeta(1).hidden=true;
            }
            chart.update(); 
            
            
        }, false);
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }
});

