import http from "http";
import url from "url"
import fs from "fs";

const base = "http://localhost";
const port = 8080;

const server = http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./index.html", function (error, data) {
        if (error) {
            fs.readFile("./404.html", function (error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write("404 Not Found");
                } else {
                    res.write(data);
                }
                res.end();
            });
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, (error) => {
    if (error) {
        console.log("something is wrong", error);
    } else {
        console.log("Server is listening on port " + port);
    }
});

