if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
    
    source.addEventListener("message", function(e) {
        var data = JSON.parse(e.data);
        // document.getElementById("result").innerHTML = e.data;
        console.log(data);    
    }, false);
        
  
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}