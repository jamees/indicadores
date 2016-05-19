var express = require('express');
var request = require('request');

var url = 'http://www.banchileinversiones.cl/moviles.rest/servicios/';    
var proxy = 'http://proxy2:8080';   

var app = express();
app.use(express.bodyParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Respuesta REST en raiz para GET
app.get('/', function (req, res) {
  var data = {
    "bestAnimals": [
      "wombat",
      "corgi",
      "puffer fish",
      "owl",
      "crow"
    ]
  };

  res.json(data);
       
    
});

//Respuesta REST en raiz para POST
app.post('/', function (req, res) {
    console.log("Llamada a servicio: " + url + req.body.servicio);
    request.post({
         'url':url+req.body.servicio
        //,'proxy':proxy
        , form: req.body}, 
    function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    res.send(body);
                }
            }
            );    
    
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});