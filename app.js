const fs = require('fs');
const http = require('http');

balancerName = process.argv[2];
PORT = process.argv[3] || 8080

let sayac=0;

const requestListener = function (req, res) {
    console.log(req.url);

    if (req.url == "/") {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const indexfile = fs.createReadStream('index.html');
        indexfile.pipe(res);
    }
    else if (req.url == '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        const saat=new Date();
        const saatJson= saat.toLocaleString();
        res.write(JSON.stringify({deneme:saatJson}));
        res.end();
    } else {
        res.writeHead(404);
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(PORT);