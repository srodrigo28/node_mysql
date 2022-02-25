const express = require("express");

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
