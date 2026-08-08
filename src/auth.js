import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export function initialiseAnonymousAuth(setUser) {
  // Listen for authentication changes and sign in anonymously if needed
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      return;
    }

    try {
      const result = await signInAnonymously(auth);
      setUser(result.user);
    } catch (error) {
      console.error("Anonymous sign-in failed:", error);
    }
  });
}
