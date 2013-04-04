(function () {
    "use strict";
    var $ = window.$,
        main;
    main = function () {
        $.getJSON("/happyTotal.json", function (result) {
            var happyTotal = parseInt(result.count, 10);
            $("#happy").append("<p>The total happy count is: " + result.count + "</p>");
            $.getJSON("/sadTotal.json", function (result) {
                var sadTotal = parseInt(result.count, 10);
                $("#sad").append("<p>The sad count is: " + result.count + "</p>");
                if (happyTotal > sadTotal) {
                    $("#overall").append("<h2>Today is a happy day  ^_^</h2>");
                } else if (sadTotal > happyTotal) {
                    $("#overall").append("<h2>Today is a sad day  T_T</h2>");
                } else {
                    $("#overall").append("<h2>Today isn't a happy or sad day  -_-</h2>");
                }
            });
        });
        $.getJSON("/happyCounts.json", function (object) {
            object.forEach(function (word) {
                $("#happyList").append("/" + word.key + "/");
            });
        });
        $.getJSON("/sadCounts.json", function (object) {
            object.forEach(function (word) {
                $("#sadList").append("/" + word.key + "/");
            });
        });
    };
    $(document).ready(main);
    window.main = main;
}());