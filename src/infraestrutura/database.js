const Sequelize = require('sequelize');

const database = process.env.DB_DATABASE|| "db_test";
const password = process.env.DB_PASS || "password";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "3306";
const user = process.env.DB_USER || "root";


const sequelize = new Sequelize(database, user , password, {
                        dialect: 'mysql',
                        host: host,
                        pool: {
                            max: 5,
                            min: 0,
                            acquire: 30000,
                            idle: 10000
                        }
                    });
 
module.exports = sequelize;

