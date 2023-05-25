var admin = require("firebase-admin");

var serviceAccount = require("./garuda-muda-firebase-adminsdk-1i86f-dae852985f");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {admin}