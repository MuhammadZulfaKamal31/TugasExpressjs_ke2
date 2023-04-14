
const { Sequelize } = require("sequelize");

const db = new Sequelize('crud_db', 'postgres', 'Agustus31', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;