import { auth } from "../../firebase";

// Middleware function to set custom claim after successful authentication.
export const setCustomClaimMiddleware = async (req, res, next) => {
  try {
    // Check if there's an authenticated user.
    const user = auth.currentUser;

    if (user) {
      // If a user is authenticated, get their UID and set the custom claim.
      const uid = user.uid;

      // Call a server-side function to set the custom claim.
      await setCustomClaimOnServer(uid);

      // Continue to the next middleware or route handler.
      next();
    } else {
      // If there's no authenticated user, do something (e.g., redirect or handle the error).
      // For example, you can redirect to the sign-in page.
      res.redirect("/signin");
    }
  } catch (error) {
    console.error("Error in setCustomClaimMiddleware:", error);

    // Handle the error here, e.g., by sending an error response.
    res.status(500).json({ error: "Internal server error" });
  }
};
