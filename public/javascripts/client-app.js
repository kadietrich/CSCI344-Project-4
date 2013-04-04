var main = function () {
    $.getJSON("/happyTotal.json", function (object) {
        var happyTotal = parseInt(object.count);
        $("#happy").append("<p>The total happy count is: " + object.count + "</p>");
        
        $.getJSON("/sadTotal.json", function (result) {
            var sadTotal = parseInt(result.count);
            $("#sad").append("<p>The sad count is: " + result.count + "</p>");
            if ( happyTotal > sadTotal) {
                $("#overall").append("<p>Today is a happy day.</p>");
            } else if (sadTotal > happyTotal) {
                $("#overall").append("<p>Today is a sad day.</p>");
            } else {
                $("#overall").append("<p>Today isn't a happy or sad day.</p>");
            }
        });
    }); 
};

$(document).ready(main);