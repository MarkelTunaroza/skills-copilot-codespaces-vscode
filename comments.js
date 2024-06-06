// Create web server
// 1. Create web server
// 2. Load the index.html
// 3. Read the comments from the file
// 4. Display the comments in the web page
// 5. Add new comments
// 6. Save the comments to the file

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [];

function renderComments() {
  var body = '<html><body>';
  body += '<form method="POST" action="/comment">';
  body += '<input type="text" name="comment" />';
  body += '<input type="submit" value="Add comment" />';
  body += '</form>';
  body += '<ul>';
  for (var i = 0; i < comments.length; i++) {
    body += '<li>' + comments[i] + '</li>';
  }
  body += '</ul>';
  body += '</body></html>';
  return body;
}

function saveComments() {
  fs.writeFile('comments.txt', comments.join('\n'), function(err) {
    if (err) {
      console.log('Failed to save comments');
    }
  });
}

fs.readFile('comments.txt', 'utf8', function(err, data) {
  if (!err) {
    comments = data.split('\n');
  }
});

http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url);
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(renderComments());
    res.end();
  } else if (req.method === 'POST' && parsedUrl.pathname === '/comment') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var comment = querystring.parse(body).comment;
      comments.push(comment);
      saveComments();
      res.writeHead(302, {'Location': '/'});
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(8080);