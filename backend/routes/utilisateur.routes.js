const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const utilisateurCtrl = require("../controllers/utilisateur.controller");

router.post('/auth/singup', utilisateurCtrl.signup);
router.post('/auth/login', utilisateurCtrl.login);
router.get('/accounts', auth, utilisateurCtrl.getAllUsers);
router.get('/accounts/:id', auth, utilisateurCtrl.getUser);

module.exports = router;