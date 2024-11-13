/**
 * Servidor do front-end
 * 
 * Bem simples. Acho que não há muito por dizer...
 */
const express   = require('express');
const path      = require('path');

const app = express();
const PORT = 2000;
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, ()=>{
    console.log('Front-end running in port '+PORT)
})