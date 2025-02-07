import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const setIsDone = async (todoId, isDone) => {
  const todoRef = doc(db, 'todos', todoId);

  try {
    await updateDoc(todoRef, { isDone: !isDone });
  } catch (error) {
    console.error(error);
  }
};