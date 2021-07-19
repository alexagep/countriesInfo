const Sequelize = require('sequelize')

module.exports = new Sequelize('crudtest', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    // port: "8889",
    // connectionLimit: 10,
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});