const express = require("express"); // chama o express para subir o nodemon
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Usuario = require('./models/Usuario');
const app = express();

app.use(express.json());

/**** Lista Todos  */
app.get("/users/all", async (req, res) => {
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
/**** Lista Todos Personalizados  */
app.get("/users", validarToken, async (req, res) => {
    await Usuario.findAll({
        attributes: ['id', 'name', 'email', 'password'],
        order: [['id', 'desc']]})
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
app.post("/user/cad", async (req, res) => {
    const { name, email, password } = req.body;
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
/**** Cadastra com Bcryptjs  */
app.post("/user", async (req, res) => {
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);

    await Usuario.create(dados)
    .then(()  => { 
        return res.json({
            erro: false,
            mensagem: "Usuário Cadastrado com sucesso!"
        })
    }).catch(() => {
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
/**** Atualiza Senha de um registro  */
app.put("/user-senha", async (req, res) => {
    const {id, password} = req.body;

    var senhaCrypt = await bcrypt.hash(password, 8);

    await Usuario.update({password: senhaCrypt}, {where: {id}})
        .then(() => {  
            return res.json({
                erro: false,
                mensagem: "Senha Atualizada com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: ":( Não conseguimos atualizar!"
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
/*** Fazendo Login */
app.post('/login', async (req, res) => {
    const usuario = await Usuario.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {email: req.body.email}
    });
    if(usuario === null){ // verifica se o usuário existe
        return res.status(400).json({
            erro: true,
            mensagem: "Erro :( Usuário não encontrado!"
        });
    };
    if(!(await bcrypt.compare(req.body.password, usuario.password))){ // verifica a senha é correta!
        return res.status(400).json({
            erro: true,
            mensagem: "Erro :( Senha inválida do Usuário!"
        });
    };

    const chave = "33787929-f17e-4c3c-9551-b0ef03791a1d";

    var token = jwt.sign({id: usuario.id}, chave, {
        expiresIn: '7d' // expira a chave em 7 dis.
    })

    return res.json({ // Sucesso passou pela validação
        erro: false,
        mensagem: " :) Login realizado com sucesso! ",
        token
    });
});

async function validarToken(req, res, next){
    // return res.json({ mesagem: "Carregar token "});
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');

    if(!token){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: :( acesso negado falta a chave de acesso!"
        });
    };
    try{
        const decoded = await promisify(jwt.verify(token, chave));
        req.UsuarioId = decoded.id;
        return next();
    }catch(err){
        return res.status(400).json({
            erro: true,
            messagem: "Erro: :( chave não é válida"
        })
    }
    //return res.json({messagem: "Chave gerada: " + token });
    return res.json({messagem: token });
    // return next();
}

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
});
