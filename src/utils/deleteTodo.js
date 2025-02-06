import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteTodo = async (todoId) => {
  const todoRef = doc(db, 'todos', todoId);

  try {
    await deleteDoc(todoRef);
  } catch (error) {
    console.error(error);
  }
};