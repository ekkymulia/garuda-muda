const express = require('express');
const gameController = require('../controllers/GameController');
const statController = require('../controllers/StatController');
const teamController = require('../controllers/TeamController');
const userController = require('../controllers/UserController')

const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const bodyParser = require('body-parser')

const admin = "$2a$12$8133S85ZeMvGjQ1pbp0uoeEkNYLmHU073apXZOHvAmBGqGCpd0jQC"

//public route

// Games routes
router.get('/games', authenticate, gameController.getAllGames);
router.post('/games', authenticate, authorize([admin]), bodyParser.json(), gameController.createGame);
router.get('/games/:gameId', authenticate, gameController.getGameDetails);

// Stats routes
router.post('/stats', authenticate, statController.createStat);

// Teams routes
router.get('/teams', authenticate, teamController.getAllTeams);
router.post('/teams', bodyParser.json(), authenticate, authorize([admin]), teamController.createTeam);

//User routes
router.post('/signup', bodyParser.json(), userController.createUser);

module.exports = router;  