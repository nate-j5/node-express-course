// Load the built-in http module
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });

  if (req.url === "/") {
    res.end("Hello, this is the home page.");
  } else if (req.url === "/about") {
    res.end("Hello, this is the about page.");
  } else {
    res.end("Sorry, this page is not found.");
  }
});

// Localhost was taking forever so I had to use IPv4 loopback address
server.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});
