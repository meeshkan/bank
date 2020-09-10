const express = require('express');
const api = require('../controllers');

const router = express.Router();

router.get('/version', api.getVersion);
router.get('/openapi', api.getOpenAPISpec);
router.post('/admin/authentication', api.authenticateAsRoot);
router.post('/client/authentication', api.authenticateAsClient);
router.get('/clients', api.getClients);
router.post('/client', api.addClient);
router.get('/client', api.getCurrentClient);
router.post('/client/transaction', api.sendMoney);
router.delete('/client', api.removeClient);
router.post('/signout', api.signOut);

module.exports = router;
