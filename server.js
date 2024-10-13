const http = require('http');
const fs = require('fs');
const qs = require('querystring');

// Money function
const Money = (salary, commission) => (salary + commission);

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve the HTML form
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/calculate') {
        // Handle form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = qs.parse(body);
            const salary = parseFloat(formData.salary);
            const commission = parseFloat(formData.commission);
            const total = Money(salary, commission);

            // Send the result back to the client
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Total earnings: ${total}</h1>`);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});