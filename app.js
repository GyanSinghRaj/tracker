const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const port = 3000;

const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

// Correctly set EJS as the view engine
app.set("view engine", "ejs");

// Correctly serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/public/views"));
// const fs=path.join(__dirname,"public")
// console.log(fs);

io.on("connection", function (socket) {
  socket.on("send-location",function(data){
    io.emit("receive-location",{id:socket.id,...data});
  });

  socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id);
  })

});

app.get("/", function (req, res) {
  res.render("index");
});

server
  .listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
