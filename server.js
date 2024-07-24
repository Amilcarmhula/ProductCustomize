const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
const PORT = 3000




// Habilitar CORS para todas as rotas
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))


// Rota para enviar o caminho da pasta exemplo
app.get('/teste', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200, {'Content-Type':'application/json'})

    const pastaExemploPath = path.join(__dirname, 'rato');
    res.end(JSON.stringify(pastaExemploPath))
    //res.send(`Caminho da pasta exemplo: ${pastaExemploPath}`);
});

app.get('/files', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const directoryPath = path.join(__dirname, 'public/svg');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.json(files);
    });
});



app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})