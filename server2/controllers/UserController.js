const User = require('../models/User')
const Firebase = require('../config/firebase')

// Controller action to get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

// Controller action to create a new user
async function createUser(req, res) {
    const user = { 
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password,
        role: req.body.role 
    };

    if (
        user.username == undefined 
        || user.email == undefined
        || user.password == undefined
        || user.role == undefined
    ){
        res.status(400).json({ error: "Bad Request" })
    }


//creating firebase account via email
  try {
    const userResponse = Firebase.admin.auth().createUser({
        email: user.email,
        emailVerified: false,
        password: user.password,
        displayName: user.username,
        disabled: false,
    }).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user in firebase:', userRecord.uid);
        //creating account in mysql db
        try {
            const userDb = User.create({ 
                firebase_uid: userRecord.uid, 
                email: user.email, 
                name: user.username,
                role: user.role 
            });
            res.status(201).json(userDb);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user in db' + error });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error while creating new user ' + error });
      });
  } catch (error) {
    res.status(400).json({ error: "Bad Request | Firebase"})
  }
}

// async function signIn(req, res){
//     const user = { 
//         email: req.body.email, 
//         password: req.body.password,
//     };

//     if (
//         user.username == undefined 
//         || user.email == undefined
//         || user.password == undefined
//         || user.role == undefined
//     ){
//         res.status(400).json({ error: "Bad Request" })
//     }

//     try {
//         const userResponse = Firebase.admin.auth().
//     } catch (error) {
        
//     }
// }


// Export the controller actions
module.exports = {
  getAllUsers,
  createUser,
};
