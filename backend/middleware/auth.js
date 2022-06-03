// Middleware gérant la protection de nos routes en fonction de l'état user (authentifié ou non) -----------------------------------------------------
const jwt = require("jsonwebtoken"); // Utilisation du package Jsonwebtoken
const db = require("../models");

// On met en place le middleware permettant de sécuriser nos routes --------------------------------------------------------------------------------
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récuparation du token d'authentification présent dans le header Authorization
    const decodedToken = jwt.verify(token, process.env.TOKEN); // Décodage du token
    const userId = decodedToken.userId; // Extraction de l'id user présent dans le token
    if (req.body.userId && req.body.userId !== userId) {
      // On vérifie si la requête contient un id user, et nous le comparons avec celui du token
      throw "Invalid user ID"; // Erreur si aucune correspondance
    } else {
      req.auth = { userId };
      db.Utilisateur.findOne({
        where: {
        id: userId,
        }
      })
      .then((user) => {
        req.auth = {
          isAdmin: user.admin
        }
      })
      .cacth
      // Sinon on enchaîne sur le middleware suivant
      next();
    }
  } catch {
    res.status(401).json({
      error: "Authentification nécessaire !",
    });
  }
};