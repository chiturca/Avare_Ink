// /app/server.js
import { setCustomClaim } from "@/firebaseAdmin";

// Function to set the custom claim using Firebase Admin (server-side operation).
export async function setCustomClaimOnServer(uid) {
  try {
    // Call Firebase Admin to set the custom claim.
    await setCustomClaim(uid);
  } catch (error) {
    console.error("Error setting custom claim on the server:", error);
    throw error;
  }
}
