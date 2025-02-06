import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

export const addTodo = async (todoName) => {
  if (!auth.currentUser) {
    console.error("Brak zalogowanego użytkownika!");
    return;
  }

  const userId = auth.currentUser.uid;
  const todosRef = collection(db, 'todos');

  try {
    const newTodo = await addDoc(todosRef, {
      name: todoName,
      isDone: false,
      userId: userId,
    });

    return { id: newTodo.id, name: todoName, isDone: false, userId };

  } catch (error) {
    console.error(error);
  }
};