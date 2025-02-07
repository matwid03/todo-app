import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const editTodo = async (id, newName) => {
  if (!id || !newName) {
    console.error("Error: Missing id or newName", { id, newName });
    return;
  }

  const todoRef = doc(db, 'todos', id);
  try {

    await updateDoc(todoRef, {
      name: newName,
    });
    console.log("Todo updated successfully!");
  } catch (error) {
    console.error("Error updating todo name: ", error);
  }
};
