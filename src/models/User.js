const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    description: {
        type: String,
        required: false,
    },

    tags: {
        type: String,
        required: false,
        default: "#semTag"
    },
    
    createdAt: {
        type: Date,
        default: Date.now,      
    }
});

// Encrypt password before save
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

mongoose.model('User', UserSchema);