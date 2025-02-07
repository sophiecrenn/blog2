const express = require("express");
const router = express.Router();
const recaptchaController = require("../controllers/recaptchaController");

// Route pour la vérification du reCAPTCHA
router.post("/verify-recaptcha", recaptchaController.verifyRecaptcha);

module.exports = router;
