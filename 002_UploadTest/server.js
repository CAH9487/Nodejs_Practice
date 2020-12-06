var http = require("http");
var url = require("url");
var formidable = require("formidable");

// http://localhost:8080/
function start(route, handle) {
    http.createServer(function (request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);
        route(handle, pathname, request, response);
    }).listen(8080);

    console.log("Server has started.");
}

exports.start = start
