const express = require('express');
const callRouter = express.Router();
const callController = require('../controllers/callController');

callRouter.get('/calls', callController.getCalls);
callRouter.post('/calls', callController.createCall);
callRouter.delete('/calls/:id', callController.deleteCall);
callRouter.get('/clients', callController.getAllClients);

module.exports = callRouter;
