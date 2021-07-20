import http from 'http';
import { parse } from "querystring";
import { getAll, getItem } from './data.js';



http.createServer((req,res) => {
    var path = req.url.toString();
    let url = req.url.split("?");  // separate route from query string
    let query = parse(url[1]);
    var path = url[0].toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getAll()));
            break;
        case '/detail':
            let found = getItem(query.name);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(found));
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page: Hello! My name is Diego Cano, and Im from Venezuela. Ive lived in Seattle for two years. I am a college student at Seattle Central College in the IT department. I have experience working with people because Ive worked as a waiter, barista, and banquet server. Id like to obtain my ASS-T in programming and try to transfer to a four-year college or university. My goal is to work for a company in the It team or as a freelancer.');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);