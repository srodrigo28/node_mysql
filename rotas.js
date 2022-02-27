const express = require("express");

const app = express();

/**  Prepara o express para receber JSON */
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Lista de Contatos!");
});

app.get("/contatos1", (req, res) => {
    res.send("lista de contatos")
})

app.get("/contatos", (req, res) => {
    return res.json({
        "nome": "Camila",
        "idade": 20,
        "sexo": "Feminino",
        "status": "Casada"
    })
})

app.get("/contatos/:id", (req, res) => {
    const id = req.params.id;
    return res.json({
        "id": id,
        "nome": "Camila",
        "idade": 20,
        "sexo": "Feminino",
        "status": "Casada"
    })
})

app.get("/contatos2/:id", (req, res) => {
    const id = req.params.id;
    const idade = req.query.idade;
    return res.json({
        "id": id,
        "nome": "Camila",
        "idade": idade,
        "sexo": "Feminino",
        "status": "Casada"
    })
})

app.get("/contatos3/:id", (req, res) => {
    const { id } = req.params;
    const { idade } = req.query;
    return res.json({
        id,
        nome: "Camila",
        idade,
        sexo: "Feminino",
        status: "Casada"
    })
})

app.get("/clientes", (req, res) => {  //Lista Todos Clientes
    return res.json({
        "nome": "Camila Queiroz",
        "cpf": 20,
        "telefone": "(62) - 9988-2230",
        "endereco": "Avenida São Paulo N. 890 Apt 1004",
	  "cidade": "Avenida São Paulo N. 890 Apt 1004",
	  "Estado": "São Paulo",
    })
})

app.post("/contato", (req, res) => {
    var nome  = req.body.nome;
    var idade = req.body.idade;
    var sexo  = req.body.sexo
    return res.json({
        nome: nome,
        idade: idade,
        sexo: sexo
    })
})


app.post("/contato1", (req, res) => {
    var nome  = req.body.nome;
    var idade = req.body.idade;
    var sexo  = req.body.sexo;
    return res.json({
        nome,
        idade,
        sexo
    })
})

app.post("/contato2", (req, res) => {
    const { nome, idade, sexo }  = req.body;
    return res.json({
        nome, idade, sexo
    })
})

app.listen(8080, () => {
    console.log("Servidor Rodando na porta 8080");
});