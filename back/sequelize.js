const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./database/app.db"
})

sequelize.sync({alter: true}).then(() => {
    console.log("Models have been synchronized");
})

module.exports = sequelize;