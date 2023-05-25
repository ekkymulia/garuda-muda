const authenticate = (req, res, next) => {
  const Firebase = require('../config/firebase')
  // Perform authentication logic here

  // try {
  //   const idToken = req.body.idToken

  //   Firebase.admin.auth().verifyIdToken(idToken)
  //   .then(function(decodedToken) {
  //     var uid = decodedToken.uid;
      
  //     console.log(uid)
      req.user = {
        role: "$2a$12$8133S85ZeMvGjQ1pbp0uoeEkNYLmHU073apXZOHvAmBGqGCpd0jQC"
      }

      next();

  //   }).catch(function(error) {
  //     // Handle error
  //     res.status(403).json({ error: 'Unauthorized' });
  //   });
  // } catch (error) {
  //   res.status(400).json({ error: "Unauthorized"})
  // }
};

const authorize = (roles) => {
  return (req, res, next) => {
    // Perform authorization logic here
    // Check if the user has the required role(s) to access the route

    // For example, check if the user's role is included in the allowed roles
    if (roles.includes(req.user.role)) {
      // If authorization is successful, call next() to proceed to the next middleware or route handler
      next();
    } else {
      // If the user is not authorized, send an error response
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
};

const firebase_checl = (req, res, next) => {

}

module.exports = { authenticate, authorize };
