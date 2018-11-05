const mongoose = require('mongoose');

const Team = mongoose.model('Team');

module.exports = {

    // list all team
    async index(req, res){
        const teams = await Team.find().populate(['owner','members','projects']);
        return res.json(teams);
    },

    // list team by ID
    async show(req, res) {
        try {
            const team = await Team.findById(req.params.id).populate(['owner','members','projects']);
            return res.json(team);                
        } catch (error) {
            return res.status(400).send({ error: 'Error showing team'});
        }
    },

    // update team by id
    async update(req, res){
        try {

            const {owner, name, description, members, projects } = req.body;

            const team = await Team.findByIdAndUpdate(req.params.id,{
                owner,
                name,
                description,
                members,
                projects
            },{new: true});

            // wating add all members
            await Promise.all(members.map(async member => {
                const teamMember = member;
                team.members.push(teamMember);
            }));

            // wating add all projects
            await Promise.all(projects.map(async project => {
                team.projects.push(project);
            }));

            await team.save();
            return res.json(team);                 

        } catch (error) {
            return res.status(400).json({ error: 'Error updating team'});
        }
    },    

    // create team
    async store(req, res){
        try {
            const { name, description, members } = req.body;

            // creating team, defining owner and add first member (user)
            const team = await Team.create({ name, description, owner: req.userId, members: req.userId});

            // wating add all members
            await Promise.all(members.map(async member => {
                const teamMember = member;
                team.members.push(teamMember);
            }));

            // save after add all members
            await team.save();
            return res.json(team);                

        } catch (error) {
            return res.status(400).send({ error: 'Error creating team'});
        }
    },
    
    // delete team by id
    async destroy(req, res){
        try {
            await Team.findByIdAndRemove(req.params.id)
            return res.send();
        } catch (error) {
            return res.status(400).send({ error: 'Error deleting team'});
        }
    },

    // add members at the team
    async addMembers(req, res){
        try {

            const { members } = req.body;
            const team = await Team.findByIdAndUpdate(req.params.id, {new: true});
            // wating add all members
            await Promise.all(members.map(async member => {
                const teamMember = member;
                team.members.push(teamMember);
            }));

            // save after add all members
            await team.save();
            return res.json(team);                

        } catch (error) {
            return res.status(400).send({ error: 'Error add new member at team'});
        }
    },

    async delMembers(req, res){
        try {

            const { members } = req.body;
            const team = await Team.findByIdAndUpdate(req.params.id, {new: true});

            // wating del member
            await Promise.all(members.map(async member => {
                team.members.pop(member)
            }));

            // save after del member
            await team.save();
            return res.json(team);                

        } catch (error) {
            return res.status(400).send({ error: 'Error del member at team'});
        }
    },

    // add project 
    async addProjects(req, res){
        try {

            const { projects } = req.body;
            const team = await Team.findByIdAndUpdate(req.params.id, {new: true});
            
            // wating add all projects
            await Promise.all(projects.map(async project => {
                team.projects.push(project);
            }));

            // save after add all project
            await team.save();
            return res.json(team);                

        } catch (error) {
            return res.status(400).send({ error: 'Error add new project at team'});
        }
    },

    // remove project
    async delProjects(req, res){
        try {

            const { projects } = req.body;
            const team = await Team.findByIdAndUpdate(req.params.id, {new: true});

            // wating del project
            await Promise.all(projects.map(async project => {
                team.projects.pop(project)
            }));

            // save after del project
            await team.save();
            return res.json(team);                

        } catch (error) {
            return res.status(400).send({ error: 'Error del project at team'});
        }
    }

    
}