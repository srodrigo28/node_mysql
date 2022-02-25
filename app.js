const express = require("express"); // chama o express para subir o nodemon
const db = require('./models/db'); // chama o arquivo de conexão

const app = express();

app.get("/", (req, res) => {
    return res.json({
        erro: false,
        nome: "Rodrigo",
        email: "rodrigoexer1@gmail.com"
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
});
