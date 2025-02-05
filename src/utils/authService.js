import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log("Błąd rejestracji:", error.message);
    throw error;
  }
};