const axios = require("axios");
const { RECAPTCHA_SECRET } = require("../config");

// Vérification du reCAPTCHA
exports.verifyRecaptcha = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: "Token is missing" });
    }

    try {
        // Appel à l'API Google pour vérifier le token
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: RECAPTCHA_SECRET,
                    response: token,
                },
            }
        );

        const { success } = response.data;

        if (success) {
            return res.json({ success: true, message: "reCAPTCHA verification successful!" });
        } else {
            return res.status(400).json({ success: false, message: "reCAPTCHA verification failed!" });
        }
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
