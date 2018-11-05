const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],

    createdAt: {
        type: Date,
        default: Date.now,      
    }

});

mongoose.model('Team', TeamSchema);