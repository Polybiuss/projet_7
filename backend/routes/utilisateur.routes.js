const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const utilisateurCtrl = require("../controllers/utilisateur.controller");

router.post('/auth/signup', utilisateurCtrl.signup);
router.post('/auth/login', utilisateurCtrl.login);
router.get('/accounts', auth, utilisateurCtrl.getAllUsers);
router.get('/accounts/:id', auth, utilisateurCtrl.getUser);
router.delete('/accounts/:id', auth, utilisateurCtrl.deleteUtilisateur);
router.put('/accounts/:id', auth, utilisateurCtrl.updateUtilisateur);
router.get('/account', auth, utilisateurCtrl.userProfil);

module.exports = router;