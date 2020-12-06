var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");

function start(request, response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>\n' +
    '    <head>\n' +
    '        <meta http-equiv="Content-Type" content="text/html; \n' +
    '            charset=UTF-8" />\n' +
    '    </head>\n' +
    '    <body>\n' +
    '        <form action="/upload" enctype="multipart/form-data" method="post">\n' +
    '            <input type="file" name="upload">\n'+
    '            <input type="submit" value="Upload file"/>\n'+
    '        </form>\n' +
    '    </body>\n' +
    '</html>\n';

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(request, response) {
  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
