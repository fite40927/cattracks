$(document).ready(function(){
    $("#submit").click(function(){
        var results = document.getElementById("results");
        results.innerHTML = "<h2>Possible Buslines and Departure Times:</h2>";

        var start = parseInt($("#start").val(), 10);
        var end = parseInt($("#end").val(), 10);
        var day = parseInt($("#day").val(), 10);
        var heritage = parseInt($("#heritage").val(), 10);

        var busline = Object.values(matchBus(start, end, day, heritage));
        var bustime = new Array();
        for(i in busline){
            var currBus = getBus()[busline[i]];
            for(j in currBus){
                if(parseInt(currBus[j][0]) == start){
                    bustime.push(new Array(currBus[j][1]));
                }
            }
        }
        for(i in bustime){
            bustime[i] = (String)(bustime[i]).split(",");
            for(j in bustime[i]){
                bustime[i][j] = String(bustime[i][j]);
                bustime[i][j] = bustime[i][j].substring(0, bustime[i][j].length - 2) + ":" + bustime[i][j].substring(bustime[i][j].length - 2, bustime[i][j].length);
            }
        }
        console.log(bustime);
        
        console.log("Buses: " + busline);
        for(i in busline){
            var b = getBusName(busline[i]);
            var div = document.createElement("div");
            div.style = "padding: 2vw;"
            var title = document.createElement("div");
            title.innerHTML = "<h3>" + b + "</h3>"
            div.innerHTML = div.innerHTML + title.innerHTML;
            var row = document.createElement("div");
            row.style = "height: 2vw;";
            for(j in bustime[i]){
                row.innerHTML = row.innerHTML + "<div style='float: left; margin-left: 2vw;'>" + bustime[i][j] + "</div>";
            };
            div.append(row);
            console.log(row);
            results.append(div);
        }
    });
});
function matchBus(start, end, day, heritage){
    var a = getBus();
    var both;
    var match = new Array();

    outer: for(var i in a){
        both = [-1, -1];
        if(heritage == 0 && (i == 5 || i == 6)){
            continue;
        }
        if(day == 1 && (i == 2 || i == 3 || i == 6)){
            continue;
        }
        else if (day == 0 && (i == 0 || i == 1 || i == 4 || i == 5)){
            continue;
        }
        inner: for(var j in a[i]){
            if(a[i][j][0] == start){
                console.log("Found start: " + i + "," + j);
                both[0] = start;
            }
            if(a[i][j][0] == end){
                console.log("Found end: " + i + "," + j);
                both[1] = end;
            }
            if(both[0] != -1 && both[1] != -1){
                match.push(i);
                break inner;
            }
        }
    }
    return match;
}
function getBus(){
    var a = [C1, C2, E1, E2, G, Hwk, Hwknd];
    return a;
}
function getBusName(buscode){
    switch(buscode){
        case "0": return "C1";
        case "1": return "C2";
        case "2": return "E1";
        case "3": return "E2";
        case "4": return "G";
        case "5": return "H";
        case "6": return "H";
    }
}