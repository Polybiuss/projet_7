const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post.controller");
const commentCtrl = require("../controllers/comment.controller");

router.post("/add", auth, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPosts);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.updatePost);

router.post("/:postId/comments", auth, commentCtrl.createComment);
router.get("/comments/:id", auth, commentCtrl.getComments);
router.delete("/comments/:id", auth, commentCtrl.deleteComment);
router.put("/comments/:id", auth, commentCtrl.updateComment);

module.exports = router;