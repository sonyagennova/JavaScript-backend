const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.findByEmail = (email) => User.findOne({email});

exports.register = async (email, password, repeatPassword) => {

    if (password !== repeatPassword) {
        throw new Error(`Passwords don't match`);
    }

    // Check if user exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new Error('This user already exists.')
    }
    // Validate password
    if (password.length < 4) {
        throw new Error('Password too short!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    // Login automatically after register
    return this.login(email, password)
}

exports.login = async (email, password) => {
    //  Check if user exists
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const payload = {
        _id: user._id,
        email: email
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
} 