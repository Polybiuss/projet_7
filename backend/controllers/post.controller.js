const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
  userId = req.auth.userId
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
      include: [
        {
          model: db.Utilisateur,
          attributes: ["nom"],
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
        "utilisateurId",
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
          attributes: ["id", "comment", "utilisateurId", "createdAt"],
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

  exports.deletePost = (req, res, next) => {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((post) => {
      console.log(req.auth.userId);
      if (post.utilisateurid == req.auth.userId || req.auth.isAdmin == true) {
        post.destroy()
        .then(() => res.status(200).json({ message: "Post supprimé !" }))
        .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(403).json({ message: "Utilisateur non autorisé !"})
      }
    })
    .catch((error) => res.status(500).json({ error }));    
  };

  exports.updatePost = (req, res, next) => {
    db.Post.findOne({
      where: { id: req.params.id },
    })
    .then((post) => {
      if (post.utilisateurid == req.auth.userId) {
      post.update({
        text: req.body.text
      })
      .then(() => res.status(200).json({
        message: "post modifié !"
      }))
      .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(403).json({ message: "Utilisateur non autorisé !"})
    }
    })
    .catch((error) => res.status(500).json({ error }));
};