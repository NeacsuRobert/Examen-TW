const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.ENUM({
            values:['COMEDY','TRAGEDY','DRAMA']
        }),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl:true
        }
    }
})

module.exports = Book;