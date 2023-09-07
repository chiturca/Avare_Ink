"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import isAdmin from "@/middleware";

const AdminDashboard = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      const userIsAdmin = await isAdmin(user);

      if (userIsAdmin) {
        console.log(user);
      } else {
        setError("Access denied. You are not an admin.");
      }
    } catch (error) {
      setError("Error signing in: " + error.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Admin Sign-In</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Sign In as Admin</button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
