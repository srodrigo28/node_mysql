const express = require("express"); // chama o express para subir o nodemon
// const db = require('./models/db'); // chama o arquivo de conexão
const Usuario = require('./models/Usuario');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        erro: false,
        nome: "Rodrigo",
        email: "rodrigoexer1@gmail.com"
    });
});

app.get("/usuario/:id", (req, res) => {
    const {id} = req.params;
    return res.json({
        erro: false,
        id, name: "ana cicilia", email: "anaci@bol.com"
    })
})

app.post("/user", async (req, res) => {
    const { name, email } = req.body;
    await Usuario.create(req.body)
    .then(()  => { 
        return res.json({
            erro: false,
            mensagem: "Usuário Cadastrado com sucesso!"
        })
    })
    .catch(() => {
    return res.status(400).json({
        erro: true,
        mensagem: ":( Não salvo"
    });
    });
});



app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
});
