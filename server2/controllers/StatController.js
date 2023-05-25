const Stat = require('../models/Stat')
const Player = require('../models/Player')
const Game = require('../models/Game')

// Controller action to create a new stat
async function createStat(req, res) {
  const { playerId, gameId, points, rebounds, assists, blocks } = req.body;
  try {
    const stat = await Stat.create({ playerId, gameId, points, rebounds, assists, blocks });
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create stat' });
  }
}

// Export the controller actions
module.exports = {
  createStat,
};
