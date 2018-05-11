const Sequelize = require('sequelize');
const path = require('path');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `./.${process.env.NODE_ENV}.env`});
}
const { DATABASE, USERNAME, PASSWORD, HOST, DIALECT } = process.env;

function createDB () {
    const sequelize = new Sequelize(
        DATABASE,
        USERNAME,
        PASSWORD,
        {
            host: HOST,
            dialect: DIALECT
        }
    );
    sequelize
        .authenticate()
        .then((res) => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    return sequelize;
}
const db = createDB();

module.exports = db;
