const User = require("../models/User");

const createAccount = async (email, password) => {
    const user = new User({ email, password });
    await user.save();

    return { success: true, message: "Account created successfully" };
}

module.exports = { createAccount }