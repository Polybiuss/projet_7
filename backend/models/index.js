const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Utilisateur = require("../models/Utilisateur.js")(sequelize, Sequelize);
db.Post = require("../models/Post.js")(sequelize, Sequelize);
db.Comment = require("../models/Comment.js")(sequelize, Sequelize);

db.Utilisateur.hasMany(db.Post, {
    onDelete: "CASCADE",
});
db.Utilisateur.hasMany(db.Comment, {
    onDelete: "CASCADE",
});
db.Post.hasMany(db.Comment, {
    onDelete: "CASCADE",
});
db.Post.belongsTo(db.Utilisateur, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Post, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Utilisateur, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "CASCADE",
});
module.exports = db;