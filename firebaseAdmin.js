const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

export const verifyIdToken = async (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};

const setCustomClaim = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
  } catch (error) {
    console.error("Error setting custom claim:", error);
  }
};

module.exports = { setCustomClaim };
