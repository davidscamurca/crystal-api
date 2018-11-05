const express = require('express');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const TeamController = require('./controllers/TeamController');
const ProjectController = require('./controllers/ProjectController');

// user routes
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.post('/users/authenticate', UserController.authenticate);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// team routes
routes.use(authMiddleware); // enable middleware 
routes.get('/teams', TeamController.index);
routes.get('/teams/:id', TeamController.show);
routes.post('/teams', TeamController.store);
routes.put('/teams/:id', TeamController.update);
routes.delete('/teams/:id', TeamController.destroy);
routes.patch('/teams/add/member/:id', TeamController.addMembers);
routes.patch('/teams/del/member/:id', TeamController.delMembers);
routes.patch('/teams/add/project/:id', TeamController.addProjects);
routes.patch('/teams/del/project/:id', TeamController.delProjects);

// project routes
routes.get('/projects', ProjectController.index);
routes.get('/projects/:id', ProjectController.show);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.destroy);

module.exports = routes;