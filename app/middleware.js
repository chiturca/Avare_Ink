import admin from "../firebaseAdmin";

const setCustomClaimsForUser = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);

    if (user.customClaims && user.customClaims.isAdmin === true) {
      console.log("Custom claims set successfully");
      return;
    }
    return admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
};

export default setCustomClaimsForUser;
