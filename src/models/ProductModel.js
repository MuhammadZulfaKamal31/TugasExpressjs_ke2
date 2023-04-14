const { Sequelize } = require("sequelize");
const db = require("../config/DataBase.js");
const Users = require("./UserModels.js");

const { DataTypes } = Sequelize;

const Product = db.define('products', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

//one to many
Users.hasMany(Product);
Product.belongsTo(Users, { foreignKey: 'userId' })

module.exports = Product;