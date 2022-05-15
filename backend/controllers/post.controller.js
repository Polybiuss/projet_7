const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
    // Nous avons besoin de récupérer l'userId par l'intermédiaire du token, à defaut du store frontend
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
  
    // Nous cherchons ensuite l'user correspondant
    db.Utilisateur.findOne({
      attributes: ["id", "nom"],
      where: {
        id: userId,
      },
    })
        db.Post.create({
          text: req.body.text,
          utilisateurId: userId,
        }).then(() => res.status(201).json({ message: "Post créé !" }));
  };

  exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      // On inclue également les infos user, like, comment, liées au post, qui nous serons utiles 
      include: [
        {
          model: db.Utilisateur,
          attributes: ["nom", "id"],
        },
        {
          model: db.Comment,
          order: [["createdAt", "DESC"]], // Affichage des commentaires dans un ordre donné
          attributes: ["id", "comment", "UtilisateurId"],
          include: [
            {
              model: db.Utilisateur,
              attributes: ["nom"],
            },
          ],
        },
      ],
    })
      .then((post) => res.status(200).json(post))
  
      .catch((error) => res.status(500).json({ error }));
  };

  exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
      attributes: [
        "id",
        "text",
        "createdAt",
        "updatedAt",
        "UserId",
      ],
  
      order: [["createdAt", "DESC"]],
  
      include: [
        {
          model: db.Utilisateur,
          attributes: ["nom", "id"],
        },
        {
          model: db.Comment,
          order: [["createdAt", "DESC"]],
          attributes: ["id", "comment", "UserId", "createdAt"],
          include: [
            {
              model: db.Utilisateur,
              attributes: ["nom"],
            },
          ],
        },
      ],
    })
      .then((posts) => res.status(200).json(posts))
  
      .catch((error) => res.status(500).json({ error }));
  };