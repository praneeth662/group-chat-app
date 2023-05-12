const Sequelize = require('sequelize');
// require('dotenv').config();

const sequelize = new Sequelize('group-chat-app' , 'root' , 'Praneeth@135' , {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;