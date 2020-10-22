const http = require("http"),
  bodyParser = require("body-parser"),
  express = require("express"),
  routes = require("./routes");

const puerto = process.env.PORT || 3000,
  app = express(),
  server = http.createServer(app);

routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

server.listen(puerto, () => {
  console.log("Servidor corriendo en http://localhost:" + puerto);
});
