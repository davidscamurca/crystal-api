const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = mongoose.model('User');

function generateToken(params = {}) {
    // generating token 
    return jwt.sign(params, authConfig.secret, {
        // this token expire in 86400 seconds, onde day
        expiresIn: 86400,
    });
}

module.exports = {
    // list all user
    async index(req, res){
        const users = await User.find();
        return res.json(users);
    },

    // list user by id
    async show(req, res) {
        try {
            const user = await User.findById(req.params.id);
            return res.json(user);                
        } catch (error) {
            return res.status(400).json({ error: 'Error showing user'});
        }
    },

    // create user
    async store(req, res){
        try {

            const { email } = req.body;

            if (await User.findOne({ email }))
                return res.status(400).json({ error: 'User already exists'});

            const user = await User.create(req.body);

            user.password = undefined; // dont return

            return res.json({ 
                user, 
                token: generateToken( {id: user.id} ),
             });
                
        } catch (error) {
            return res.status(400).json({ error: 'Error creating user'});
        }
    },

    // update user by id
    async update(req, res){
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return res.json(user);                 
        } catch (error) {
            return res.status(400).json({ error: 'Error updating user'});
        }
    },

    // delete user by id
    async destroy(req, res){
        try {
            await User.findByIdAndRemove(req.params.id)
            return res.send();
        } catch (error) {
            return res.status(400).json({ error: 'Error deleting user'});
        }
    },

    // authenticate user
    async authenticate(req, res){

        const { email, password } = req.body;

        const user = await User.findOne({email}).select('+password');

        if (!user)
            return res.status(400).json({ error: 'User not found'});
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).json({ error: 'Invalid password'});
        
        user.password = undefined; // dont return

        res.json({ 
            user, 
            token: generateToken( {id: user.id} ),
         });
    }
}