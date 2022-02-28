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

app.post("/contato", validaContato, (req, res) => {
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

app.put("/contato/:id", (req, res) => { // 1. Put
    const id = req.params.id;
    return res.json({
        id: id
    });
})

app.put("/contato2/:id", (req, res) => { // 2. Put
    const { id } = req.params;
    return res.json({
        id
    });
})

app.put("/contato3/:id", (req, res) => { // 3. Put
    const { id } = req.params;
    return res.json({
        id
    });
})

app.put("/contato4/:id", (req, res) => { // 4. Put
    const { id } = req.params;
    const { nome } = req.body;
    const { email } = req.body;
    return res.json({
        id, 
        nome: nome, 
        email: email
    });
})

app.put("/contato5/:id", (req, res) => { // 5. Put
    const { id } = req.params;
    const { nome, email } = req.body;
    return res.json({
        id,  // Aqui passagem req.param
        nome, email // Aqui passagem req.Body
    });
})

app.put("/contato6", (req, res) => { // 6. Put sem param
    const { id, nome, email } = req.body;
    return res.json({
        id, nome, email // Aqui passagem req.Body
    });
})

app.delete("/contato/:id", (req, res) => { // 1. Delete sem param
    const id = req.params.id;
    return res.json({
        mesagem: "Excluido com sucesso"
    });
})

app.delete("/contato2/:id", (req, res) => { // 2. Delete sem param
    const { id } = req.params;
    return res.json({
        id,
        mesagem: "Excluido com sucesso"
    });
})

app.delete("/contato3", (req, res) => { // 3. Delete sem param
    const { id } = req.body;
    return res.json({
        id, // Aqui passagem req.Body
        mesagem: "Excluido com sucesso"
    });
})

// app.use((req, res, next) => {
//     console.log("Acessou a rota Midware");
//     next();
// });

function validaContato(req, res, next){
    if(!req.body.idade){
        return res.json({
            erro: true,
            mensagem: "Necessário informar o e-mail!"
        });
    };
    return next();
}

app.listen(8080, () => {
    console.log("Servidor Rodando na porta 8080");
});