const mongoose = require('mongoose');

const Project = mongoose.model('Project');

module.exports = {
    // list all projects
    async index(req, res){
        const projects = await Project.find().populate('owner');
        return res.json(projects);
    },

    // list project by id
    async show(req, res) {
        try {
            const project = await Project.findById(req.params.id).populate('owner');
            return res.json(project);                
        } catch (error) {
            return res.status(400).json({ error: 'Error showing project'});
        }
    },

    // create project
    async store(req, res){
        try {
            const project = await Project.create({...req.body, owner: req.userId});
            return res.json(project);
                
        } catch (error) {
            return res.status(400).json({ error: 'Error creating project'});
        }
    },

    // update team by id
    async update(req, res){
        try {
            const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return res.json(project);                 
        } catch (error) {
            return res.status(400).json({ error: 'Error updating project'});
        }
    },

    // delete project by id
    async destroy(req, res){
        try {
            await Project.findByIdAndRemove(req.params.id)
            return res.json();
        } catch (error) {
            return res.status(400).json({ error: 'Error deleting project'});
        }
    }
}