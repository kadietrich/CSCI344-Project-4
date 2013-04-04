var main = function () {
    $.getJSON("/happyTotal.json", function (result) {
        var happyTotal = parseInt(result.count);
        $("#happy").append("<p>The total happy count is: " + result.count + "</p>");
        $.getJSON("/sadTotal.json", function (result) {
            var sadTotal = parseInt(result.count);
            $("#sad").append("<p>The sad count is: " + result.count + "</p>");
            if ( happyTotal > sadTotal) {
                $("#overall").append("<h2>Today is a happy day.</h2>");
            } else if (sadTotal > happyTotal) {
                $("#overall").append("<h2>Today is a sad day.</h2>");
            } else {
                $("#overall").append("<h2>Today isn't a happy or sad day.</h2>");
            }
        });
    });
    $.getJSON("/happyCounts.json", function (object) {
        object.forEach( function (word) {
            $("#happyList").append("/" + word.key + "/")
        });
    });
    $.getJSON("/sadCounts.json", function (object) {
        object.forEach( function (word) {
            $("#sadList").append("/" + word.key + "/")
        });
    });
};

$(document).ready(main);