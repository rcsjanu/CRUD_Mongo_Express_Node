const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userController = require('../controllers/user.controller')
const auth = require('../helpers/jwt');
const userRoleAuth = require ('../helpers/authenticateRole');


router.post('/register', (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    userController.register(req.body).then(
        res.json({ success: true })
    ).catch(err => next(err))
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    userController.login({ email, password }).then(user => {
        user ? res.json(user) : res.json({ error: 'Email or password is incorrect' });
    }
    ).catch(err => next(err))
})

router.get('/allUsers', [auth.authenticateToken, userRoleAuth], (req, res, next) => {
    userController.getAllUsers().then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

router.get('/:id', [auth.authenticateToken], (req, res, next) => {
    userController.getUserById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

router.post('/updateuser/:id', auth.authenticateToken, (req, res, next) => {
    const userData = req.body;

    userController.updateUserByID(req.params.id, userData).then(
        res.json({ success: true })
    ).catch(err => next(err))
})

router.delete('/deleteUser/:id', [auth.authenticateToken, userRoleAuth], (req, res, next) => {
    userController.deleteUserByID(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})


module.exports = router;