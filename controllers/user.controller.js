const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt');
const { use } = require('../routes/routes');


async function login({ email, password }) {
    const user = await User.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken(user);
        return { ...user.toJSON(), token }
    }
}

async function register(params){
    const user = new User(params)
    await user.save();
}

async function getUserById(id) {

    const user = await User.findById(id);
    return user.toJSON()
}

async function getAllUsers() {

    const user = await User.find();
    return user;
}

async function deleteUserByID(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
}

async function updateUserByID(id,userData) {
    const user = await User.findByIdAndUpdate(id, userData);
    return user;
}

async function logout() {
    return 
}

module.exports = {
    login,
    register,
    getUserById,
    logout,
    getAllUsers,
    deleteUserByID,
    updateUserByID
};