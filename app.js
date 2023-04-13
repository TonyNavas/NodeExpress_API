const express = require('express');
const path = require('path');

const app = express();

app.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })   
  })

app.listen(3000, () =>{
    console.log('listening on port', 3000)
});