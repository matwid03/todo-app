import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/Form/Form';
import { TodoItem } from './components/TodoItem/TodoItem';
import { getSubheading } from './utils/getSubheading';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { Register } from './components/Register/Register';
import { Button } from './components/Button/Button';
import { Login } from './components/Login/Login';
import { addTodo } from './utils/addTodo';
import { deleteTodo } from './utils/deleteTodo';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { setIsDone } from './utils/setIsDone';

function App() {
	const [user, setUser] = useState(null);
	const [isFormShown, setIsFormShown] = useState(false);
	const [todos, setTodos] = useState([]);
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const [loadingTodos, setLoadingTodos] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setIsAuthChecked(true);

			if (currentUser) {
				const userId = currentUser.uid;
				const todosRef = collection(db, 'todos');
				const q = query(todosRef, where('userId', '==', userId));

				const todosSnapshot = onSnapshot(q, (snapshot) => {
					const todosList = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));

					setTodos(todosList);
					setLoadingTodos(false);
				});
				return todosSnapshot;
			} else {
				setTodos([]);
				setLoadingTodos(false);
			}
		});

		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		await signOut(auth);
	};

	if (!isAuthChecked || loadingTodos) {
		return <div className={styles.loader}></div>;
	}
	return (
		<div className={styles.container}>
			{user ? (
				<>
					<header className={styles.header}>
						<div>
							<h1>Do zrobienia</h1>
							<h2>{getSubheading(todos.length)}</h2>
						</div>

						{!isFormShown && (
							<button
								onClick={() => {
									setIsFormShown(true);
								}}
								className={styles.btn}>
								+
							</button>
						)}
					</header>

					{isFormShown && (
						<Form
							onSubmit={async (newTodoName) => {
								try {
									await addTodo(newTodoName);

									setIsFormShown(false);
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					)}
					<ul>
						{todos.map(({ id, name, isDone }) => (
							<TodoItem key={id} name={name} isDone={isDone} onDeleteBtnClick={() => deleteTodo(id)} onDoneBtnClick={() => setIsDone(id)} />
						))}
					</ul>
					<Button onClick={handleLogout} className={styles.btn}>
						Wyloguj
					</Button>
				</>
			) : (
				<>
					<h1>Logowanie / Rejestracja</h1>
					<Register />
					<Login />
				</>
			)}
		</div>
	);
}

export default App;
