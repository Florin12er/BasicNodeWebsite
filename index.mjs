import http from "http";
import fs from "fs";

const base = "http://localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  const url = req.url;

  const serveFile = (filePath) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        fs.readFile("./404.html", (error, data) => {
          if (error) {
            res.writeHead(404);
            res.write("404 Not Found");
          } else {
            res.writeHead(404);
            res.write(data);
          }
          res.end();
        });
      } else {
        res.write(data);
        res.end();
      }
    });
  };

  if (url === "/about") {
    serveFile("./about.html");
  } else if (url === "/") {
    serveFile("./index.html");
  } else if (url === "/contact") {
    serveFile("./contact-me.html");
  } else {
    serveFile("./404.html");
  }
});

server.listen(port, (error) => {
  if (error) {
    console.log("Something is wrong", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});
