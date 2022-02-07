const sequelize = require("../sequelize");
const Book = require("./Book");
const { DataTypes } = require("sequelize");

const VirtualShelf = sequelize.define("VirtualShelf", { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

VirtualShelf.hasMany(Book)

module.exports = VirtualShelf;