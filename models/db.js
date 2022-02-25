const Sequelize = require('sequelize');

const banco = "celke";
const user = "root";
const password = "";
const host = "localhost";
const driver = "mysql";

// const sequelize = new Sequelize('celke', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const sequelize = new Sequelize(banco, user, password, {
    host: host,
    dialect: driver
});

sequelize.authenticate()
.then(function(){
     console.log(":) Sucesso!");
})
.catch(function(){
    console.log(":( Erro!")
})

module.exports = sequelize;
