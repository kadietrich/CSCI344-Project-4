var main = function () {
    $.getJSON("/counts.json", function (object) {
        object.forEach( function(elt){
            $("body").append("<p>" + elt.key + " : " + elt.count + "</p>");
        });        
    });
    /*
    if(happyTotal > sadTotal){
        $("body").append("<p>Today is a happy day :)</p>");
    } else if(sadTotal > happyTotal){
        $("body").append("<p>Today is a sad day :'(</p>");
    } else {
        $("body").append("<p>Today isn't especially happy or sad.</p>");
    }
    */
      $.getJSON("/happyTotal.json", function (object) {
        $("#happy").append("<p>Happy total: "+ object.count + "</p>");
      });
      
      $.getJSON("/sadTotal.json", function (object) {
        $("#sad").append("<p>Sad total: "+ object.count + "</p>");
      });
};

$(document).ready(main);