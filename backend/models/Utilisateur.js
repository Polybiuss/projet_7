module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        nom: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        mdp: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return Utilisateur
};