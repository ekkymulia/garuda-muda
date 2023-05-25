const express = require('express');
const app = express();
const sequelize = require('./config/database');

const sequelize_db = require('./config/database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  
// Import and initialize the models
const User = require('./models/User');
const Player = require('./models/Player');
const Team = require('./models/Team');
const Game = require('./models/Game');
const Stat = require('./models/Stat');

//relations
// const relations = require('./models/relations')
User.hasOne(Player, { foreignKey: 'user_id', sourceKey: 'user_id' });
Player.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
Player.belongsTo(Team, { foreignKey: 'team_id' });
Team.hasMany(Player, { foreignKey: 'team_id' });
Game.belongsTo(Team, { foreignKey: 'team_id' });
Game.hasMany(Stat, { foreignKey: 'game_id' });
Stat.belongsTo(Game, { foreignKey: 'game_id' });
Player.hasMany(Stat, { foreignKey: 'player_id' });
Stat.belongsTo(Player, { foreignKey: 'player_id' });

// Sync the models with the database
// Sequelize
sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})
.finally(() => {
    // User.create({
    //   firebase_uid: "asdasd",
    //   name: "Admin",
    //   email: "asdads@gmail.com",
    //   role: 1
    // })

  // sequelize.close();
});

// Routes
const routes = require('./routes/routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





