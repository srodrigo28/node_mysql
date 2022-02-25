const express = require("express"); // chama o express para subir o nodemon
// const db = require('./models/db'); // chama o arquivo de conexão
const Usuario = require('./models/Usuario');
const app = express();

app.use(express.json());

/**** Lista Todos  */
app.get("/users", async (req, res) => {
    await Usuario.findAll()
    .then((users) => {
        return res.json({
            erro: false,
            users
        });
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: ":( Nenhum usuário encontrado"
        });
    })
});
/**** Lista por ID  */
app.get("/user/:id", async (req, res) => {
    const {id} = req.params;
    //await Usuario.findAll({ where: { id: id } })
    await Usuario.findByPk(id)
    .then((user) =>  {
        return res.json({
            erro: false,
            user: user
        });
     } )
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: ":( Nenhum usuário encontrado"
        });
     } )
});
/**** Cadastra  */
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
/**** Atualiza um registro  */
app.put("/user", async (req, res) => {
    const {id} = req.body;

    await Usuario.update(req.body, {where: {id}})
        .then(() => {  
            return res.json({
                erro: false,
                mensagem: "Atualizado com sucesso"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: ":( Não fui atualizado!"
        });
    });
});
/**** Delete  */
app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;

    await Usuario.destroy({ where: {id}})
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: `Usuário Apagado!`
        });
    }).catch(() => {
        return res.status(400).json({
            erro: false,
            mensagem: `Erro !`
        });
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
});
