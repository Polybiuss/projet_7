const db =  require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  if (!/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(req.body.email)) {   // Test password strength
    return res.status(401).json({ error: 'veuillez renseigner une adresse mail correcte !' });
  } else {
    db.Utilisateur.findOne({
      where: {
        email: req.body.email,
      }, 
    })
    .then((user) => {
      if (user) {
        return res.status(401).json({ error: "l'adresse email est déjàa utilisé !"});
      }
    bcrypt
      .hash(req.body.mdp, 10)
      .then((hash) => {
        db.Utilisateur.create({
          nom: req.body.nom,
          email: req.body.email,
          mdp: hash,
          admin: false,
        })
  
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
  
          .catch((error) => res.status(400).json({ error }));
      })
  
      .catch((error) => res.status(500).json({ error }));
    })
  }
};

  exports.login = (req, res, next) => {
    db.Utilisateur.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur inexistant !" }); // Si user inexistant un message d'erreur est retourné
      }
      bcrypt
        .compare(req.body.mdp, user.mdp) // On compare les hash de mot de passe transmis avec celui en mémoire
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            // Si OK un token est renvoyé au frontend avec un user id, et un message de bienvenue
            userId: user.id,
            admin: user.admin,
            token: jwt.sign(
              // Sign permet d'encoder un nouveau token
              { userId: user.id },
              process.env.TOKEN,
              { expiresIn: "24h" }
            ),
            message: "Bonjour " + user.nom + " ! 🙂",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    });
  };

  exports.getUser = (req, res, next) => {
    db.Utilisateur.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => res.status(200).json(user))
  
      .catch((error) => res.status(500).json({ error }));
  };

  exports.getAllUsers = (req, res, next) => {
    db.Utilisateur.findAll({
      attributes: [
        // Le tableau correspond aux informations demandées à la BDD
        "id",
        "nom",
        "email",
      ],
    })
      .then((users) => res.status(200).json(users))
  
      .catch((error) => res.status(500).json({ error }));
  };


  exports.deleteUtilisateur = (req, res, next) => {
    if (req.params.id == req.auth.userId) {
        db.Utilisateur.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(() => res.status(200).json({ message: "utilisateur supprimé !" }))
        .catch((error) => res.status(500).json({ error }));
    } else {
        res.status(403).json({ message: "utilisateur non autorisé !"})
    }
};

  exports.updateUtilisateur = (req, res, next) => {
      db.Utilisateur.findOne({
        where: { id: req.params.id },
      })
      .then((user) => {
        console.log(req.auth.userId);
        if (user.id = req.params.id) {
        user.update({
          nom: req.body.nom
        })
        .then(() => res.status(200).json({
          message: "utilisateur modifié"
        }))
        .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(400).json({ message: "utilisateur non autorisé !"})
      }
      })
      .catch((error) => res.status(500).json({ error }));
  };

  exports.userProfil = (req, res, next) => {
    db.Utilisateur.findOne({
      where: { id: req.auth.userId },
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};
exports.verifyProfil = (req, res, next) => {
  db.Utilisateur.findOne({
    where: { id: req.auth.userId },
  })
    .then((user) => {
      console.log(req.body.mdp);
      bcrypt
        .compare(req.body.mdp, user.mdp) // On compare les hash de mot de passe transmis avec celui en mémoire
        .then((valid) => {
          console.log(user);
          if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
          } else {
            return res.status(200).json({ message: "mot de passe correct" });
          }
           
    })
    .catch((error) => res.status(500).json({ error }));
});
};