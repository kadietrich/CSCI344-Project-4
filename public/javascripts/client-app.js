var main = function () {
    $.getJSON("/counts.json", function (elt) {
        $("body").append("<p>" + elt.key + ":" + elt.count + "</p>");
    });
};

$(document).ready(main);