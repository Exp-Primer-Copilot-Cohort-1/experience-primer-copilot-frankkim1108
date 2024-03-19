// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var comments = [];
http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    if(pathName == '/'){
        var fileContent = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fileContent);
    }
    else if(pathName == '/submit'){
        var str = '';
        req.on('data', function(chunk){
            str += chunk;
        });
        req.on('end', function(){
            var obj = querystring.parse(str);
            comments.push(obj);
            res.end(JSON.stringify(comments));
        });
    }
    else if(pathName == '/get'){
        var jsonStr = JSON.stringify(comments);
        res.end(jsonStr);
    }
    else {
        var filePath = path.join(__dirname, pathName);
        if(fs.existsSync(filePath)){
            var fileContent = fs.readFileSync(filePath);
            res.end(fileContent);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
        }
    }
}).listen(8080);
console.log('Server is listening at port 8080...');
```

###