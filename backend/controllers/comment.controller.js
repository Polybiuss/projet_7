const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {
    userId = req.auth.userId
    db.Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    db.Comment.create({
      comment: req.body.comment,
      postId: req.params.postId,
      utilisateurId: userId,
    })
      .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
  
      .catch((error) => res.status(400).json({ error }));
  };

  exports.getComments = (req, res, next) => {
    db.Comment.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "comment", "createdAt", "utilisateurId", "postId"], 
      include: [
        {
          model: db.Utilisateur,
          attributes: ["nom"],
        },
      ],
    })
      .then((comments) => res.status(200).json(comments))
  
      .catch((error) => res.status(500).json({ error }));
  };

  exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((comment) => {
      if (comment.utilisateurid == req.auth.userId || req.auth.isAdmin == true) {
        comment.destroy()
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(403).json({ message: "utilisateur non autorisé !"})
      }
    })
    .catch((error) => res.status(500).json({ error }));    
  };

  exports.updateComment = (req, res, next) => {
    db.Comment.findOne({
      where: { id: req.params.id },
    })
    .then((comment) => {
      if (comment.utilisateurid == req.auth.userId) {
      comment.update({
        comment: req.body.comment
      })
      .then(() => res.status(200).json({
        message: "commentaire modifié !"
      }))
      .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(403).json({ message: "utilisateur non autorisé !"})
    }
    })
    .catch((error) => res.status(500).json({ error }));
};