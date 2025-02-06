import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const setIsDone = async (todoId) => {
  const todoRef = doc(db, 'todos', todoId);

  try {
    await updateDoc(todoRef, { isDone: true });
  } catch (error) {
    console.error(error);
  }
};