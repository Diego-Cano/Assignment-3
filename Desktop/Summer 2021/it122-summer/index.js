import http from 'http';
import { parse } from 'querystring';
import { getAll, getItem } from './data.js';



http.createServer((req,res) => {
    var path = req.url.toString();
    let url = req.url.split("?");  // separate route from query string
    let query = parse(url[1]); // convert query string to a JS object
    console.log(path);
    console.log(query);
    console.log(url)
    
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getAll()));
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page: Hello! My name is Diego Cano. I am 21 years old');
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getItem('Venezuela')));
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page: Hello! My name is Diego Cano. I am 21 years old');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);




