var http = require("http");
var url = require("url");
var formidable = require("formidable");

// http://localhost:8080/
function start(route, handle) {
    http.createServer(function (request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);

        request.setEncoding("utf8");

        request.addListener("data", (postDataChunk) => {
            postData += postDataChunk;
            console.log(`Received POST data chunk ${postDataChunk}.`);
        });

        request.addListener("end", () => {
            route(handle, pathname, response, postData);
        });
    }).listen(8080);

    console.log("Server has started.");
}

exports.start = start
