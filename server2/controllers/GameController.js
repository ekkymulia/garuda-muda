const Game = require('../models/Game')
const Team = require('../models/Team')
const Stat = require('../models/Stat')

// Controller action to get all games
async function getAllGames(req, res) {
  try {
    const games = await Game.findAll({ include: Team });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
}

// Controller action to create a new game
async function createGame(req, res) {
  const { date, teamId } = req.body;
  try {
    const game = await Game.create({ date, teamId });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
}

// Controller action to get game details including stats
async function getGameDetails(req, res) {
  const { gameId } = req.params;
  try {
    const game = await Game.findByPk(gameId, { include: { model: Stat, include: { model: Player } } });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve game details' });
  }
}

// Export the controller actions
module.exports = {
  getAllGames,
  createGame,
  getGameDetails,
};
