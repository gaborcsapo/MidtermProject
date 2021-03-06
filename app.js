var Request = require('request');
var bodyParser = require('body-parser');
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var ardatArray;
var ardat1 = 0;
var ardat2 = 0;
var ardat3 = 0;
var ardat4 = 0;
var port = process.env.PORT || 3000;

app.set("views", __dirname);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//ROUTES
app.get("/api" , function (request, response) {
	response.send(ardsdat);
});
app.get('/yun/:pitch/:rate/:filter', function(req, res) {
  res.send("success");
  sendData(req.params.pitch, req.params.rate, req.params.filter);
});

app.get("*", function(request, response){
	response.render('index');
});

server.listen(port, function () {
  console.log('Example app listening on port ' + port);
});



function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function sendData(pitch, rate, filter) {
   if (Math.abs(parseInt(pitch) - ardat1)>3){
      ardat1 = parseInt(pitch);
      console.log(ardat1);
      io.emit('ardat1', ardat1);
   }
   if (Math.abs(parseInt(rate) - ardat2)>3){
      ardat2 = parseInt(rate);
      console.log(ardat2);
      io.emit('ardat2', ardat2);
   }
    if (Math.abs(parseInt(rate) - ardat3)>3){
      ardat3 = parseInt(filter);
      console.log("ardat3" + ardat3);
      io.emit('ardat3', ardat3);
   }
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data);
}

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('ardat1', ardat1);
  io.emit('ardat2', ardat2);
  io.emit('ardat3', ardat3);
});