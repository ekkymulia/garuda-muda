const { Player, User } = require('../models');

// Controller action to get all players
async function getAllPlayers(req, res) {
  try {
    const players = await Player.findAll({ include: User });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve players' });
  }
}

// Controller action to create a new player
async function createPlayer(req, res) {
  const { name, teamId, userId } = req.body;
  try {
    const player = await Player.create({ name, teamId, userId });
    res.status(201).json(player);
  } catch (error) {
    res.status(500). json({ error: 'Failed to create player' });
  }
}

// Export the controller actions
module.exports = {
  getAllPlayers,
  createPlayer,
};
