const Team = require('../models/Team')
const Player = require('../models/Player')

// Controller action to get all teams
async function getAllTeams(req, res) {
  try {
    const teams = await Team.findAll({ include: Player });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teams' });
  }
}

// Controller action to create a new team
async function createTeam(req, res) {
  const { teamName } = req.body;
  
  try {
    if (teamName == undefined || teamName == ''){
        throw new Error("Value Cannot Empty")
    }

    const team = await Team.create({ team_name: teamName });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
}

// Export the controller actions
module.exports = {
  getAllTeams,
  createTeam,
};
